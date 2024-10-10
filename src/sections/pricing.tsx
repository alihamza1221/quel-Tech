import PricingPlan from "@/components/pricing-plan";

export default function Pricing() {
  return (
    <section className="border-b-border dark:border-b-darkBorder dark:bg-secondaryBlack inset-0 flex w-full flex-col items-center justify-center border-b-2 bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] font-base">
      <div className="mx-auto w-container max-w-full px-5 py-20 lg:py-[100px]">
        <h2 className="mb-14 text-center text-2xl font-heading md:text-3xl lg:mb-20 lg:text-4xl">
          Pricing
        </h2>
        <div className="grid grid-cols-3 gap-8 w900:mx-auto w900:w-2/3 w900:grid-cols-1 w500:w-full">
          <PricingPlan
            planName="Basic"
            description="Get started with essential tools"
            price="10"
            perks={[
              "Access to Task Manager for organizing tasks and to-dos",
              "Basic Study Timetable Generator with up to 3 subjects",
              "Progress Tracker for a single subject",
              "1 User Account with multi-device sync",
              "Email support",
            ]}
          />
          <PricingPlan
            planName="Essential"
            description="Perfect for students looking to optimize their study"
            price="25"
            perks={[
              "Task Manager with priority-based sorting and search",
              "Enhanced Study Timetable with up to 10 subjects",
              "Progress Tracker with analytics for multiple subjects",
              "3 User Accounts with multi-device sync",
              "Priority email and chat support",
              "Customizable notifications for tasks and deadlines",
            ]}
            mostPopular
          />
          <PricingPlan
            planName="Growth"
            description="A comprehensive productivity & study experience"
            price="50"
            perks={[
              "Unlimited access to Task Manager with advanced filters",
              "Study Timetable Generator with unlimited subjects",
              "Progress Tracker with in-depth analytics",
              "Up to 10 User Accounts with multi-device sync",
              "Priority phone, email, and chat support",
              "Integration with calendar apps (Google Calendar)",
              "Early access to new features and updates",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
