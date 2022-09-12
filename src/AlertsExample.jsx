import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { ALERT_ACTIONS } from "./AlertsReducer";
import { AlertsContext } from "./AlertsContext";
import { v4 as uuid } from "uuid";

const ControlledTextField = ({ name, control, label, required = false }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          label={label}
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
    <FormControl>
      <FormLabel id="severity">Severity</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={"warning"}
        render={({ field: { onChange, value } }) => (
          <RadioGroup onChange={onChange} value={value}>
            {radioButtons}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};

export const AlertsExample = () => {
  const { dispatch } = useContext(AlertsContext);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      title: "Warning",
      message: "Example Alert",
      severity: "warning",
      timeLimit: 5,
      url: "http://google.com/",
    },
  });

  const onSubmit = (data) =>
    dispatch({
      type: ALERT_ACTIONS.ADD_ALERT,
      payload: { id: uuid(), ...data },
    });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gridGap: 24 }}>
      <FormLabel id="create-alert" sx={{ fontSize: 24, fontWeight: "bold" }}>
        Create Alert
      </FormLabel>
      <ControlledTextField
        name={"title"}
        control={control}
        label={"Title"}
      />
      <ControlledTextField
        name={"message"}
        control={control}
        label={"Message"}
        required
      />
      <ControlledTextField
        name={"timeLimit"}
        control={control}
        label={"Time Limit"}
        required
      />
      <ControlledTextField name={"url"} control={control} label={"URL"} />
      <ControlledRadioInput name={"severity"} control={control} />
      <Button
        color={"primary"}
        onClick={handleSubmit(onSubmit)}
        variant={"contained"}
      >
        Submit
      </Button>
    </Box>
  );
};
