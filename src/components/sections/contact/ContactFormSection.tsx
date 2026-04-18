import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
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

  const onSubmit = async (_values: FormValues) => {
    // Simulated submit — no backend wired.
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(true);
    reset();
  };

  const inquiryValue = watch("inquiryType");

  return (
    <SectionShell bg="bg-muted/30">
      <div className="mx-auto max-w-2xl rounded-3xl border border-border/60 bg-card p-6 shadow-sm md:p-10">
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
          {contactCopy.form.title}
        </h2>

        {submitted ? (
          <div
            className="mt-8 rounded-2xl border-l-4 bg-muted/40 p-6"
            style={{ borderColor: "var(--rl-green)" }}
            role="status"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2
                className="h-6 w-6 flex-shrink-0"
                style={{ color: "var(--rl-green)" }}
              />
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {contactCopy.form.successTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {contactCopy.form.successBody}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
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

            <div>
              <Label htmlFor="organisation">{fields.organisation.label}</Label>
              <Input
                id="organisation"
                placeholder={fields.organisation.placeholder}
                className="mt-1.5"
                {...register("organisation")}
              />
            </div>

            <div>
              <Label htmlFor="inquiryType">{fields.inquiryType.label}</Label>
              {mounted ? (
                <Select
                  value={inquiryValue}
                  onValueChange={(v) =>
                    setValue("inquiryType", v, { shouldValidate: true })
                  }
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

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
              style={{ backgroundColor: "var(--rl-green)", color: "white" }}
            >
              {isSubmitting ? contactCopy.form.submitting : contactCopy.form.submit}
            </Button>
          </form>
        )}
      </div>
    </SectionShell>
  );
}
