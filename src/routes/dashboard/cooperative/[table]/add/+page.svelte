<script lang="ts">
    import Breadcrumb from "$lib/components/Breadcrumb.svelte";
    import { Label, Input, Helper } from "flowbite-svelte";
<<<<<<< HEAD
    import { requestHeaders, membershipHeaders, cmPayoutHeaders, 
         savingsHeaders, csTransactionHeaders,
         loansHeaders, clTransactionHeaders } from "$lib/headers";
=======
    import { requestHeaders as headers } from "$lib/headers";
>>>>>>> 1d99c967236541bae72b4a6cab2bc7ff81d69a8d
    import type { PageServerData } from "./$types";

  
    let formData: Record<string, any> = {};

    export let data: NonNullable<PageServerData>;
  
    const table = data["table"];

<<<<<<< HEAD
    const pageTitle =
    table === "request"
      ? "Request"
      : table === "membership"
        ? "Membership"
        : table === "cm_payout"
          ? "Member Payouts"
          : table === "savingsaccounts"
            ? "Savings Accounts"
            : table === "cs_transaction"
              ? "Savings Transactions"
              : table === "loanrecords"
                ? "Loan Records"
                : table === "cl_transaction"
                  ? "Loan Transactions"
                  : undefined;
    const headers =
    table === "request"
      ? requestHeaders
      : table === "membership"
        ? membershipHeaders
        : table === "cm_payout"
          ? cmPayoutHeaders
          : table === "savingsaccounts"
            ? savingsHeaders
            : table === "cs_transaction"
              ? csTransactionHeaders
              : table === "loanrecords"
                ? loansHeaders
                : table === "cl_transaction"
                  ? clTransactionHeaders
                  : undefined;

=======
>>>>>>> 1d99c967236541bae72b4a6cab2bc7ff81d69a8d
  
    const handleSubmit = async () => {
      await fetch("/dashboard/cooperative/api/database/create", {
        method: "POST",
        body: JSON.stringify({
          data: JSON.stringify(formData),
          table: table,
        }),
      });
<<<<<<< HEAD

     
    };
=======
    };

>>>>>>> 1d99c967236541bae72b4a6cab2bc7ff81d69a8d
  </script>
  


  <main class="w-full">
    <Breadcrumb
      items={[
        { href: "/dashboard/cooperative", text: "Cooperative" },
<<<<<<< HEAD
        { href: `/dashboard/cooperative/${table}/`, text: pageTitle },
        { href: `/dashboard/cooperative/${table}/add`, text: "Add an Entry" },
=======
        { href: `/dashboard/cooperative/request/`, text: table },
        { href: `/dashboard/cooperative/request/add`, text: "Add an Entry" },
>>>>>>> 1d99c967236541bae72b4a6cab2bc7ff81d69a8d
      ]}
    />
    {#each headers as header (header)}
      <div class="mb-3 w-96">
        <Label for={header} class="block mb-2">{header}</Label>
        <Input
          type="text"
          id={header}
          bind:value={formData[header]}
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <Helper class="mt-2 hidden" color="red" id="error-char">
        <span class="font-medium">Please enter characters only (A-Z, a-z)</span>
      </Helper>
      <Helper class="mt-2 hidden" color="red" id="error-num">
        <span class="font-medium">Please enter numbers only (0-9)</span>
      </Helper>
      <Helper class="mt-2 hidden" color="red" id="error-date">
        <span class="font-medium">Please enter in date format only (2023-02-01 09:00:00)</span>
      </Helper>
    {/each}
  
    <button
      on:click={handleSubmit}
      class="mt-4 bg-accent hover:bg-primary-600 text-white px-4 py-2 rounded"
    >
      Add an Entry
    </button>
  </main>
  
