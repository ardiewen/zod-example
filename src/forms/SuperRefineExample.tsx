import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Section from "../components/Section";
import InputGroup from "../components/InputGroup";
import FieldSet from "../components/FieldSet";

const schemaWithSuperRefine = z
  .object({
    hasAllergies: z.enum(["yes", "no"]),
    minorAllergies: z.string().optional(),
    majorAllergies: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.hasAllergies === "yes") {
      if (!val.minorAllergies || val.minorAllergies.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["minorAllergies"],
          message: "Required",
        });
      }

      if (!val.majorAllergies || val.majorAllergies.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["majorAllergies"],
          message: "Required",
        });
      }
    }
  });

type FormData = z.infer<typeof schemaWithSuperRefine>;

export default function SuperRefineExample() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      hasAllergies: "no",
      minorAllergies: "",
      majorAllergies: "",
    },
    resolver: zodResolver(schemaWithSuperRefine),
    shouldUnregister: true,
  });

  const hasAllergies = watch("hasAllergies");
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Section>
      <h2>Using `superRefine`</h2>
      <p>
        When `hasAllergies` is "yes", then the subsequent minorAllergies and
        majorAllergies fields become required (e.g. min length 1).
      </p>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          maxWidth: "20em",
        }}
      >
        <FieldSet legend="Do you have any allergies?">
          <span>
            <label htmlFor="Yes">Yes</label>
            <input type="radio" value="yes" {...register("hasAllergies")} />
          </span>
          <span>
            <label htmlFor="No">No </label>
            <input type="radio" value="no" {...register("hasAllergies")} />
          </span>
          {errors.hasAllergies && (
            <span>{errors.hasAllergies.message as string}</span>
          )}
        </FieldSet>
        {hasAllergies === "yes" && (
          <>
            <InputGroup>
              <label htmlFor="minorAllergies">Minor Allergies</label>
              <input {...register("minorAllergies")} />
              {errors.minorAllergies && (
                <span>{errors.minorAllergies.message as string}</span>
              )}
            </InputGroup>
            <InputGroup>
              <label htmlFor="majorAllergies">Major Allergies</label>
              <input {...register("majorAllergies")} />
              {errors.majorAllergies && (
                <span>{errors.majorAllergies.message as string}</span>
              )}
            </InputGroup>
          </>
        )}
        <input type="submit" />
      </form>
    </Section>
  );
}
