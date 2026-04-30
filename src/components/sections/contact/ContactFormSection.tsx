import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send, Clock } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactCopy } from "@/data/en/contact";

const fields = contactCopy.form.fields;

const schema = z.object({
  firstName: z.string().trim().min(1, `${fields.firstName.label} is required`).max(80),
  lastName: z.string().trim().min(1, `${fields.lastName.label} is required`).max(80),
  email: z.string().trim().email("Please enter a valid email").max(160),
  organisation: z.string().trim().max(160).optional().or(z.literal("")),
  inquiryType: z.string().min(1, `${fields.inquiryType.label} is required`),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

type FormValues = z.infer<typeof schema>;

export function ContactFormSection() {
  const [submitted, setSubmitted] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [submittedName, setSubmittedName] = React.useState("");

  React.useEffect(() => setMounted(true), []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      organisation: "",
      inquiryType: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    setSubmittedName(values.firstName);
    setSubmitted(true);
    reset();
  };

  const inquiryValue = watch("inquiryType");

  return (
    <SectionShell bg="bg-[color:var(--rl-light-bg)]">
      <Reveal>
        <div
          className="mx-auto max-w-2xl rounded-3xl border border-border/60 bg-card p-6 shadow-sm md:p-10"
          style={{ borderTopColor: "var(--rl-green)", borderTopWidth: "3px" }}
        >
          <h2 className="text-2xl font-bold text-foreground md:text-3xl mb-8">
            {contactCopy.form.title}
          </h2>

          {submitted ? (
            /* ── Success state ── */
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                backgroundColor: "color-mix(in oklab, var(--rl-green) 6%, white)",
                border: "1px solid rgba(79,153,7,0.2)",
              }}
              role="status"
            >
              <div
                className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(79,153,7,0.12)" }}
              >
                <CheckCircle2 className="h-8 w-8" style={{ color: "var(--rl-green)" }} />
              </div>

              <h3 className="text-xl font-bold text-foreground">Thank you, {submittedName}!</h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-sm mx-auto">
                {contactCopy.form.successBody}
              </p>

              {/* Response time */}
              <div
                className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(79,153,7,0.1)",
                  color: "var(--rl-green)",
                }}
              >
                <Clock className="h-3.5 w-3.5" />
                Our team will respond within 1 business day
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setSubmittedName("");
                  }}
                >
                  Send another message
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* First + Last name */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">{fields.firstName.label}</Label>
                  <Input
                    id="firstName"
                    placeholder={fields.firstName.placeholder}
                    className="mt-1.5"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-destructive">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">{fields.lastName.label}</Label>
                  <Input
                    id="lastName"
                    placeholder={fields.lastName.placeholder}
                    className="mt-1.5"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">{fields.email.label}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={fields.email.placeholder}
                  className="mt-1.5"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* Organisation */}
              <div>
                <Label htmlFor="organisation">{fields.organisation.label}</Label>
                <Input
                  id="organisation"
                  placeholder={fields.organisation.placeholder}
                  className="mt-1.5"
                  {...register("organisation")}
                />
              </div>

              {/* Inquiry type */}
              <div>
                <Label htmlFor="inquiryType">{fields.inquiryType.label}</Label>
                {mounted ? (
                  <Select
                    value={inquiryValue}
                    onValueChange={(v) => setValue("inquiryType", v, { shouldValidate: true })}
                  >
                    <SelectTrigger id="inquiryType" className="mt-1.5">
                      <SelectValue placeholder={fields.inquiryType.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.inquiryType.options.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="mt-1.5 h-10 w-full rounded-md border border-input bg-background" />
                )}
                {errors.inquiryType && (
                  <p className="mt-1 text-xs text-destructive">{errors.inquiryType.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message">{fields.message.label}</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder={fields.message.placeholder}
                  className="mt-1.5"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
                )}
              </div>

              {/* Submit + response time */}
              <div className="space-y-3">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full group font-semibold"
                  disabled={isSubmitting}
                  style={{ backgroundColor: "var(--rl-green)", color: "white" }}
                >
                  {isSubmitting ? (
                    contactCopy.form.submitting
                  ) : (
                    <>
                      {contactCopy.form.submit}
                      <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>

                {/* Response time */}
                <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  We respond within 1 business day
                </p>
              </div>
            </form>
          )}
        </div>
      </Reveal>
    </SectionShell>
  );
}
