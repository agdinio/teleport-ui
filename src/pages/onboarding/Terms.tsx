import React, { useState } from "react";

import {
  FormControl,
  VStack,
  Flex,
  Box,
  Text,
  chakra,
  Image,
} from "@chakra-ui/react";
import _sample from "lodash/sample";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";

import { ReactComponent as DiscordIcon } from "../../assets/images/alienworlds-db-icon-discord.svg";
import { ReactComponent as TelegramIcon } from "../../assets/images/alienworlds-db-icon-telegram.svg";
import { FormCheckbox } from "../../components/ui/FormCheckbox";
import { InputField, InputFieldLabel } from "../../components/ui/InputField";
import { MainButton } from "../../components/ui/MainButton";
import { NakedButton } from "../../components/ui/NakedButton";
import { NFTCard } from "../../components/ui/NFTCard";
import { useActions, useAppState, useEffects } from "../../store";

const Terms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, control, getValues, formState, setValue } = useForm({
    defaultValues: { avatar: 1, name: "", email: "", age: false, terms: false },
    mode: "onChange",
  });
  const {
    game: { wax, planets },
  } = useAppState();
  const actions = useActions();
  const effects = useEffects();
  const history = useHistory();

  function setAvatarAndTag() {
    return effects.game.setTagAndAvatar(wax(), {
      avatar: getValues("avatar"),
      tag: getValues("name"),
    });
  }

  function agreeTerms() {
    return actions.game.agreeTerms();
  }

  async function ready() {
    setIsLoading(true);
    try {
      await agreeTerms();
      await setAvatarAndTag();
      await actions.game.selectPlanet(_sample(planets).planet_name);
      await actions.game.loadPlayerData({ untilTagReady: true });
      history.push("/onboarding/planet");
    } catch (ex) {
      toast.error(ex.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Image
        src="/images/alienworlds-db-logo_full_color.svg"
        alt="Alien Workds Logo"
        w="full"
        maxW="200px"
        mb={4}
      />
      <Text fontFamily="Orbitron" letterSpacing="0.2em" fontSize="lg" mb={14}>
        WELCOMES YOU
      </Text>

      <Flex direction={{ base: "column", lg: "row" }} flexGrow={1}>
        <VStack alignItems="flex-start">
          <Text
            textAlign="start"
            fontFamily="Titillium Web"
            fontSize="22px"
            color="#f6a800"
            mb={1}
            letterSpacing="0.05em"
          >
            Choose your avatar{" "}
            <chakra.span color="#e0e0e0" fontSize="17px">
              (discover others as you play)
            </chakra.span>
          </Text>
          <Controller
            name="avatar"
            control={control}
            defaultValue={1}
            rules={{ required: true }}
            render={() => (
              <Flex flexWrap="wrap">
                <Box
                  onClick={() => setValue("avatar", 1, { shouldDirty: true })}
                  cursor="pointer"
                  opacity={getValues("avatar") === 1 ? 1 : 0.5}
                >
                  <NFTCard
                    prefilled={{
                      type: "Human",
                      title: "Male Human",
                      subtitle:
                        "Mining on Alien Worlds ain't like mining on Earth, farm boy.",
                      image:
                        "https://alienworlds.mypinata.cloud/ipfs/QmXa4fjB7AVd8rLvUcBk5uPKVugg2Bfj26PEwVth71T3yn",
                    }}
                    selected={getValues("avatar") === 1}
                  />
                </Box>
                <Box w={6} />
                <Box
                  onClick={() => setValue("avatar", 2, { shouldDirty: true })}
                  cursor="pointer"
                  opacity={getValues("avatar") === 2 ? 1 : 0.5}
                >
                  <NFTCard
                    prefilled={{
                      type: "Human",
                      title: "Female Human",
                      subtitle: "Adventure is worthwile in itself.",
                      image:
                        "https://alienworlds.mypinata.cloud/ipfs/QmQUU3KsrRuPiFgmu9wJWp2f9NJ4WzD3eVjMRJdctf9rtR",
                    }}
                    selected={getValues("avatar") === 2}
                  />
                </Box>
              </Flex>
            )}
          />
        </VStack>
        <Box w={16} />
        <VStack align="flex-start" spacing={4}>
          <FormControl id="name">
            <InputFieldLabel>Username</InputFieldLabel>
            <InputField
              maxW={390}
              type="text"
              placeholder="Min 4 char, only alphabets & numbers."
              {...register("name", {
                pattern: /^[\w-_.]*$/i,
                minLength: 4,
                required: true,
              })}
            />
          </FormControl>

          <FormControl id="E-Mail">
            <InputFieldLabel>E-Mail</InputFieldLabel>
            <InputField
              maxW={390}
              type="email"
              placeholder="Email address"
              {...register("email", {
                minLength: 4,
                required: true,
              })}
            />
          </FormControl>
          <Box h={8} />
          <FormCheckbox
            name="age"
            {...register("age", {
              validate: { isTrue: (val) => val === true },
            })}
            pl={5}
          >
            I am 18+ years of age
          </FormCheckbox>
          <FormCheckbox
            name="terms"
            {...register("terms", {
              validate: { isTrue: (val) => val === true },
            })}
            pl={5}
          >
            I Agree to the Terms & Conditions
          </FormCheckbox>

          <Box h={8} />

          <MainButton
            size="xl"
            variant={!formState.isValid ? "disabled" : "default"}
            isLoading={isLoading}
            isDisabled={!formState.isValid}
            onClick={ready}
          >
            {!formState.isValid ? "Not ready" : "I'm ready"}
          </MainButton>
        </VStack>
      </Flex>

      <Flex
        color="white"
        mt={8}
        alignItems="center"
        justify="center"
        flexWrap="wrap"
      >
        <Text mt={4}>Join the community</Text>
        <Flex ml={8} alignItems="center" justify="center" flexWrap="wrap">
          <NakedButton
            color="white"
            fill="white"
            leftIcon={
              <Box w="29px">
                <TelegramIcon />
              </Box>
            }
            mt={4}
          >
            Telegram
          </NakedButton>
          <NakedButton
            leftIcon={
              <Box w="29px">
                <DiscordIcon />
              </Box>
            }
            ml={4}
            mt={4}
          >
            Discord
          </NakedButton>
        </Flex>
      </Flex>
    </>
  );
};

export default Terms;
