<script lang="ts">
  import DescriptiveLink from "$lib/components/DescriptiveLink.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  let links = data.links.filter((link) => link.href !== "/dashboard");
</script>

<div class="w-full flex flex-col space-y-4">
  {#each links as link}
    {#if link.href === "/dashboard/human_resources"}
      <div class="w-full">
        <a
          href="/dashboard/human_resources"
          class="text-2xl font-bold flex items-center pb-6"
        >
          {link.label}
        </a>
        <DescriptiveLink
          links={[
            {
              href: "/dashboard/human_resources/employee",
              label: "Employees",
              icon: "groups",
              description: "Show the list of current employees.",
            },
            {
              href: "/dashboard/human_resources/job",
              label: "Jobs",
              icon: "work",
              description: "Explore and manage job-related information.",
            },
            {
              href: "/dashboard/human_resources/shift",
              label: "Shifts",
              icon: "schedule",
              description: "View and manage employee work schedules.",
            },
            {
              href: "/dashboard/human_resources/timesheet",
              label: "Timesheets",
              icon: "punch_clock",
              description:
                "Track and manage employee working hours and attendance.",
            },
            {
              href: "/dashboard/human_resources/health-exam",
              label: "Health Exams",
              icon: "medical_information",
              description:
                "Track and manage employee health examination records.",
            },
          ]}
        />
      </div>
    {:else if link.href === "/dashboard/project_management"}
      <div class="w-full">
        <a
          href="/dashboard/human_resources"
          class="text-2xl font-bold flex items-center pb-6"
        >
          Project Management
        </a>
        <DescriptiveLink
          links={[
            {
              href: "/dashboard/project_management/teams",
              label: "Teams",
              icon: "groups",
              description: "Show the list of current teams.",
            },
            {
              href: "/dashboard/project_management/projects",
              label: "Projects",
              icon: "work",
              description: "Explore and manage project-related information.",
            },
            {
              href: "/dashboard/project_management/software",
              label: "Software",
              icon: "code",
              description: "View and manage software-related information.",
            },
          ]}
        />
      </div>
    {:else if link.href === "/dashboard/marketing"}
      <div class="w-full">
        <a
          href="/dashboard/marketing"
          class="text-2xl font-bold flex items-center pb-6"
        >
          Marketing and Customer Acquisition
        </a>
        <DescriptiveLink
          links={[
            {
              href: "/dashboard/marketing/Client",
              label: "Client",
              icon: "people",
              description:
                "Centralizes client data for easy access and management.",
            },
            {
              href: "/dashboard/marketing/Contract",
              label: "Contract",
              icon: "contract",
              description: "Houses a complete record of contract agreements.",
            },
          ]}
        />
      </div>
    {:else if link.href === "/dashboard/cooperative"}
      <div class="w-full">
        <a
          href="/dashboard/cooperative"
          class="text-2xl font-bold flex items-center pb-6"
        >
          Cooperative
        </a>
        <DescriptiveLink
          links={[
            {
              href: "/dashboard/cooperative/Request",
              label: "Request",
              icon: "contract",
              description: "Track all request applications.",
            },
            {
              href: "/dashboard/cooperative/Membership",
              label: "Membership",
              icon: "group",
              description: "Know more about the members.",
            },
            {
              href: "/dashboard/cooperative/CM_Payout",
              label: "Membership Payout",
              icon: "money",
              description: "Track the payout transactions of all members.",
            },
            {
              href: "/dashboard/cooperative/SavingsAccounts",
              label: "Savings Accounts",
              icon: "wallet",
              description: "Assess the status of the savings accounts.",
            },
            {
              href: "/dashboard/cooperative/CS_Transaction",
              label: "Savings Transactions",
              icon: "book",
              description: "Track all transactions of all savings accounts.",
            },
            {
              href: "/dashboard/cooperative/LoanRecords",
              label: "Loan Records",
              icon: "edit",
              description: "Assess the status of the loan records.",
            },
            {
              href: "/dashboard/cooperative/CL_Transaction",
              label: "Loan Transactions",
              icon: "receipt",
              description: "Track all transactions of all loan records.",
            },
          ]}
        />
      </div>
    {:else if link.href === "/dashboard/supplies"}
      <div class="w-full">
        <a
          href="/dashboard/supplies"
          class="text-2xl font-bold flex items-center pb-6"
        >
          Supplies and Inventory
        </a>
        <DescriptiveLink
          links={[
            {
              href: "/dashboard/supplies/Item",
              label: "Items",
              icon: "devices",
              description: "Assess current item information.",
            },
            {
              href: "/dashboard/supplies/Item_Transaction",
              label: "Transactions",
              icon: "contract",
              description: "Track all transactions of all inventory items.",
            },
            {
              href: "/dashboard/supplies/Supplier",
              label: "Supplier",
              icon: "warehouse",
              description: "Know more about supplier contact information.",
            },
          ]}
        />
      </div>
    {:else if link.href === "/dashboard/finance"}
      <div class="w-full">
        <a
          href="/dashboard/finance"
          class="text-2xl font-bold flex items-center pb-6"
        >
          Finance
        </a>
        <DescriptiveLink
          links={[
            {
              href: "/dashboard/finance/Salary",
              label: "Salary",
              icon: "man",
              description: "View the salaries of each employee",
            },
            {
              href: "/dashboard/finance/Budget",
              label: "Budget",
              icon: "wallet",
              description: "View the summary of budgets alloted",
            },
            {
              href: "/dashboard/finance/Expenditure",
              label: "Expenditure",
              icon: "book",
              description: "Track the expenses of the company",
            },
            {
              href: "/dashboard/finance/Contract_Transaction",
              label: "Contract Transaction",
              icon: "receipt",
              description: "Track the transactions made from the contracts",
            },
            {
              href: "/dashboard/finance/Profit",
              label: "Profit",
              icon: "money",
              description: "View the log of profits gained by the company",
            },
          ]}
        />
      </div>
    {/if}
  {/each}
</div>
