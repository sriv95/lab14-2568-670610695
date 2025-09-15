import {
  Modal,
  Stack,
  TextInput,
  Radio,
  Select,
  Checkbox,
  Alert,
  Button,
  PasswordInput,
  Text,
  Divider,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMarathonFormStore } from "../store/MarathonFormStore";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { marathonSchema } from "../zod/MarathonSchema";
import { useEffect, useState } from "react";
import { type MarathonModalProps } from "../libs/Marathon";
export default function MarathonModal({ opened, onClose }: MarathonModalProps) {
  const [agree, setAgree] = useState(false);
  const {
    fname,
    lname,
    plan,
    gender,
    email,
    password,
    confirmPassword,
    haveCoupon,
    couponCode,
    setFname,
    setLname,
    setPlan,
    setGender,
    setEmail,
    setPassword,
    setConfirmPassword,
    setHaveCoupon,
    setCouponCode,
    reset,
  } = useMarathonFormStore();

  // Mantine Form
  const mantineForm = useForm({
    initialValues: {
      fname,
      lname,
      plan,
      gender,
      agree,
      email,
      password: "",
      confirmPassword: "",
      haveCoupon: false,
      couponCode: "",
    },
    validate: zod4Resolver(marathonSchema),
    validateInputOnChange: true,
  });
  // update Zustand form real-time
  useEffect(() => { }, []);

  const onSubmitRegister = () => {
    //  alert หลังจาก กด Register
    onClose();
    reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Register CMU Marathon 🏃‍♂️"
      centered
      size="xl"
    >
      <form onSubmit={mantineForm.onSubmit(onSubmitRegister)}>
        <Stack>
          <Group justify="space-between" gap="xs" grow>
            <TextInput
              label="First name"
              withAsterisk
              value={fname}
              onChange={(e) => {
                setFname(e.currentTarget.value);
                mantineForm.setFieldValue("fname", e.currentTarget.value);
              }}
              error={mantineForm.errors.fname}
            />
            <TextInput
              label="Last name"
              withAsterisk
              value={lname}
              onChange={(e) => {
                setLname(e.currentTarget.value);
                mantineForm.setFieldValue("lname", e.currentTarget.value);
              }}
              error={mantineForm.errors.lname}
            />
          </Group>
          <TextInput
            label="Email"
            withAsterisk
            description="ex.excemble@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
              mantineForm.setFieldValue("email", e.currentTarget.value);
            }}
            error={mantineForm.errors.email}
          />
          {/* PasswordInput */}
          <PasswordInput
            label="Password"
            description="Password must contain 6-12 charaters"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
              mantineForm.setFieldValue("password", e.currentTarget.value);
            }}
            error={mantineForm.errors.password}
            withAsterisk
          />
          <PasswordInput
            label="Confirm Password"
            description="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.currentTarget.value);
              mantineForm.setFieldValue("confirmPassword", e.currentTarget.value);
            }}
            error={mantineForm.errors.confirmPassword}
            withAsterisk
          />
          <Select
            label="Plan"
            placeholder="Please select.."
            data={[
              { value: "funrun", label: "Fun run 5.5 Km (500 THB)" },
              { value: "mini", label: "Mini Marathon 10 Km (800 THB)" },
              { value: "half", label: "Half Marathon 21 Km (1,200 THB)" },
              { value: "full", label: "Full Marathon 42.195 Km (1,500 THB)" },
            ]}
            value={plan}
            onChange={(value) => {
              if (value !== null) {
                const v = value as "funrun" | "mini" | "half" | "full";
                setPlan(value as "funrun" | "mini" | "half" | "full");
                mantineForm.setFieldValue("plan", v);
              }
            }}
            error={mantineForm.errors.plan}
          />

          <Radio.Group
            label="Gender"
            value={gender}
            onChange={(value) => {
              if (value !== null) {
                const v = value as "male" | "female";
                setGender(v);
                mantineForm.setFieldValue("gender", v);
              }
            }}
            error={mantineForm.errors.gender}
          >
            <Radio m={4} value="male" label="Male 👨" />
            <Radio m={4} value="female" label="Female 👩" />
          </Radio.Group>

          <Alert color="blue" title="Promotion 📢">
            Coupon (30% Discount)
          </Alert>
          {/* เลือกกรออก coupon ตรงนี้ */}
          <Checkbox label="I have coupon" checked={haveCoupon} onChange={(e) => {
            setHaveCoupon(e.currentTarget.checked);
            mantineForm.setFieldValue("haveCoupon", e.currentTarget.checked);
          }} />
          {/* จะต้องแสดงเมื่อกด เลือก I have coupon เท่านั้น*/}
          <TextInput label="Coupon Code" display={haveCoupon ? "block" : "none"} value={couponCode} onChange={(e) => {
            setCouponCode(e.currentTarget.value)
            mantineForm.setFieldValue("couponCode", e.currentTarget.value);
          }}
          error={mantineForm.errors.couponCode} />
          {/* แสดงราคาการสมัครงานวิ่งตามแผนที่เลือก  */}
          <Text>Total Payment : THB</Text>
          <Divider my="xs" variant="dashed" />
          <Checkbox
            label={
              <>
                I accept
                <Text mx={2} span c="red" inherit>
                  terms and conditions
                </Text>
              </>
            }
            checked={agree}
            onChange={(e) => {
              setAgree(e.currentTarget.checked);
              mantineForm.setFieldValue("agree", e.currentTarget.checked);
            }}
            error={mantineForm.errors.agree}
          />
          <Button type="submit" disabled={!mantineForm.values.agree}>
            Register
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
