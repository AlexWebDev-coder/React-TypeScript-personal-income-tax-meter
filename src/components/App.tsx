/** @format */

import React, { FC, useState } from "react";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import { withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  Container,
  Typography,
} from "@material-ui/core";

import IOSSwitch from "./SwitchStyle";

import "../scss/style.scss";

const GreenRadio = withStyles({
  checked: {},
})((props: RadioProps) => <Radio size="small" color="default" {...props} />);

const App: FC = () => {
  const [value, setValue] = useState<string>("month");
  const [number, setNumber] = useState<number>(0);
  const [prompt, setPrompt] = useState<boolean>(false);
  const [state, setState] = useState({
    checked: true,
  });

  const handleChangeSwitcher = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleX = () => {
    prompt ? setPrompt(false) : setPrompt(true);
  };

  const prettify = (num: number) => {
    let n = num.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");
  };

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^(\s*[0-9]+\s*)+$/;
    if (
      ((e.target as HTMLInputElement).value === "" ||
        re.test((e.target as HTMLInputElement).value)) &&
      (e.target as HTMLInputElement).value.toString().length < 10
    ) {
      (e.target as HTMLInputElement).value !== ""
        ? setNumber(
            parseInt((e.target as HTMLInputElement).value.replaceAll(" ", ""))
          )
        : setNumber(0);
    }
  };

  return (
    <Container>
      <FormControl>
        <Typography className="textColor">Сумма</Typography>
        <Box className="container">
          <RadioGroup name="salary" value={value} onChange={handleChange}>
            <Box>
              <FormControlLabel
                value="month"
                control={<GreenRadio style={{ color: "black" }} />}
                label={<b>Оклад за месяц</b>}
              />
            </Box>
            <Box className="btnInfoIX">
              <FormControlLabel
                className="radioMargin"
                value="MROT"
                control={<GreenRadio style={{ color: "black" }} />}
                label={<b>МРОТ</b>}
              />
              {prompt ? (
                <p className="classHoverFreeze">
                  <button onClick={handleX} className="titleBtn">
                    x
                  </button>
                </p>
              ) : (
                <p className="classHover">
                  <button onClick={handleX} className="titleBtn">
                    i
                  </button>
                </p>
              )}
            </Box>
            <Box>
              <FormControlLabel
                className="radioMargin"
                value="day"
                control={<GreenRadio style={{ color: "black" }} />}
                label={<b>Оплата за день</b>}
              />
            </Box>
            <Box>
              <FormControlLabel
                className="radioMargin"
                value="hour"
                control={<GreenRadio style={{ color: "black" }} />}
                label={<b>Оплата за час</b>}
              />
            </Box>
          </RadioGroup>
          {value !== "MROT" ? (
            <>
              <Box className="positionBox">
                <Typography
                  className={state.checked ? "colorTrue" : "colorFalse"}
                >
                  <b>Указать с НДФЛ</b>
                </Typography>
                <Box>
                  &nbsp;
                  <FormControlLabel
                    className="radioMargin"
                    control={
                      <IOSSwitch
                        checked={state.checked}
                        onChange={handleChangeSwitcher}
                        name="checked"
                      />
                    }
                    label=""
                  />
                </Box>
                <Typography
                  className={state.checked ? "colorFalse" : "colorTrue"}
                >
                  <b>Без НДФЛ</b>
                </Typography>
              </Box>

              <Box className="positionInput">
                <input
                  className="textField"
                  value={prettify(number)}
                  onChange={handleChangeEvent}
                />
                <b>
                  &nbsp; &#x20bd;
                  {value === "day"
                    ? " в день"
                    : value === "hour"
                    ? " в час"
                    : null}
                  &nbsp;
                </b>
              </Box>
            </>
          ) : null}
        </Box>
      </FormControl>
      {value === "month" ? (
        <Box className="boxContainer">
          <Typography>
            <b>
              {state.checked
                ? prettify(number)
                : prettify(number - Math.round(number * 0.13))}
              &nbsp;&#x20bd;&nbsp;
            </b>
            сотрудник будет получать на руки
          </Typography>
          <Typography>
            <b>
              {state.checked
                ? prettify(Math.round((number * 13) / 87))
                : prettify(Math.round(number * 0.13))}
              &nbsp;&#x20bd;&nbsp;
            </b>
            НДФЛ, 13% от оклада
          </Typography>
          <Typography>
            <b>
              {state.checked
                ? prettify(Math.round((number * 100) / 87))
                : prettify(number)}
              &nbsp; &#x20bd;&nbsp;
            </b>
            за сотрудника в месяц
          </Typography>
        </Box>
      ) : null}
    </Container>
  );
};

export default App;
