import React from "react"
import { useForm } from "react-hook-form"
import { Stack } from "@rent_avail/layout"
import { Button } from "@rent_avail/controls"
import { Text } from "@rent_avail/typography"
import Input from "@rent_avail/input"
import { useHistory } from "react-router-dom"
import { createSession } from "../../api/sessions"

const OTPForm = () => {
  const history = useHistory()
  const { handleSubmit, register, errors, setError, formState } = useForm()

  const onSubmit = async (values) => {
    console.log('submitted')
    try {
      const data = await createSession(values)
      if (data && data.error) {
        setError("code", {
          type: "manual",
          message: data.error,
        })
      } else {
        history.push("/users")
      }
    } catch (err) {
      console.error("Error:", err)
    }
  }

  return (
    <Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          mt={2}
          label="Code"
          type="code"
          name="code"
          ref={register()}
        />
        {errors.code && (
          <Text color="red" pt={2}>
            {errors.code.message}
          </Text>
        )}

        <Button mt={2} loading={formState.isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </Stack>
  )
}

export default OTPForm