import React from "react";

import { Checkbox, CheckboxProps, Icon } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { CheckmarkIcon } from "components/ui/Icons";

const FormCheckbox = React.forwardRef<any, CheckboxProps>((props, ref) => {
  return (
    <Checkbox
      ref={ref}
      fontFamily="Titillium Web"
      fontWeight={400}
      size="lg"
      borderRadius={6}
      iconSize="3rem"
      _checked={{
        color: "#0ed4a8!important",
        backgroundColor: "#0ed4a8",
        mb: 12,
      }}
      iconColor="#0ed4a8"
      icon={<Icon w="20px" h="20px" as={CheckmarkIcon} />}
      css={css`
        box-shadow: none;
        .chakra-checkbox__control {
          border-color: #0ed4a8;
          border-radius: 9px;
          width: 25px;
          height: 25px;
        }

        .chakra-checkbox__label {
          font-size: 20px;
        }

        [data-checked] {
          color: #0ed4a8;
        }

        [data-checked].chakra-checkbox__control {
          background-color: #0ed4a8;
          color: #fff;
          fill: #fff;
        }

        [data-focus] {
          box-shadow: none;
        }
      `}
      {...props}
    />
  );
});

export { FormCheckbox };
