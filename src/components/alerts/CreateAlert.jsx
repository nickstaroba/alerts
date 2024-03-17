import { yupResolver } from "@hookform/resolvers/yup";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import * as yup from "yup";

import { AlertsContext } from "../../contexts/AlertsContext";
import { ALERT_ACTIONS } from "../../reducers/AlertsReducer";
import { PageHeading } from "../PageHeading";

const ControlledTextField = ({
  control,
  errors,
  handleClear,
  label,
  max = 20,
  min = 1,
  multiline,
  name,
  required = false,
  type = "text",
}) => {
  const isNumber = type === "number";

  const isError = !!errors[name];

  const numberErrorMessage = `${name} must be a number between ${min} and ${max}`;

  const errorMessage = isNumber ? numberErrorMessage : errors[name]?.message;

  const inputProps = isNumber
    ? {
        max,
        min,
        type,
      }
    : undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          error={isError}
          helperText={isError ? errorMessage : " "}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: !!handleClear && (
              <IconButton
                sx={{
                  visibility: value ? "visible" : "hidden",
                }}
                onClick={handleClear}
              >
                <ClearIcon sx={{ height: 16, width: 16 }} />
              </IconButton>
            ),
            inputProps,
          }}
          label={label}
          multiline={multiline}
          onChange={onChange}
          required={required}
          value={value}
        />
      )}
    />
  );
};

const severityOptions = [
  {
    label: "Warning",
    value: "warning",
  },
  {
    label: "Error",
    value: "error",
  },
  {
    label: "Info",
    value: "info",
  },
  {
    label: "Success",
    value: "success",
  },
];

export const ControlledRadioInput = ({ name, control }) => {
  const radioButtons = severityOptions.map((option) => (
    <FormControlLabel
      control={<Radio />}
      key={option.value}
      label={option.label}
      value={option.value}
    />
  ));

  return (
    <FormControl sx={{ marginBottom: 2 }}>
      <FormLabel id={name}>Severity</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={"warning"}
        render={({ field: { onChange, value } }) => (
          <RadioGroup onChange={onChange} value={value}>
            <>{radioButtons}</>
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};

export const CreateAlert = () => {
  const { dispatch } = useContext(AlertsContext);

  const validationSchema = yup.object().shape({
    title: yup.string(),
    message: yup.string().required(),
    severity: yup.string(),
    timeout: yup.number().integer().min(1).max(20).required(),
    href: yup.string().url(),
  });

  const {
    control,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      href: "https://google.com/",
      message: "",
      severity: "warning",
      timeout: 5,
      title: "Title",
    },
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) =>
    dispatch({
      type: ALERT_ACTIONS.ADD_ALERT,
      payload: { id: uuid(), ...data },
    });

  useEffect(() => {
    setValue("message", "Message", { shouldDirty: true });
    trigger("message");
  }, [setValue, trigger]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <FormLabel id={"create-alert"}>
        <PageHeading heading={"Create Alert"} />
      </FormLabel>
      <ControlledTextField
        control={control}
        errors={errors}
        handleClear={() => {
          setValue("title", "");
        }}
        label={"Title"}
        name={"title"}
      />
      <ControlledTextField
        control={control}
        errors={errors}
        handleClear={() => {
          setValue("message", "");
        }}
        label={"Message"}
        multiline
        name={"message"}
        required
      />
      <ControlledTextField
        control={control}
        errors={errors}
        label={"Timeout (Seconds)"}
        name={"timeout"}
        required
        type={"number"}
      />
      <ControlledTextField
        control={control}
        errors={errors}
        handleClear={() => {
          setValue("href", "");
        }}
        label={"URL"}
        name={"href"}
      />
      <ControlledRadioInput name={"severity"} control={control} />
      <Button
        color={"secondary"}
        disabled={!isDirty || !isValid}
        onClick={handleSubmit(onSubmit)}
        variant={"contained"}
      >
        Submit
      </Button>
    </Box>
  );
};
