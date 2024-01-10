<script lang="ts">
    import { Search, Button } from "flowbite-svelte";
    import Table from "$lib/components/Table.svelte";
    import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  
    import type { PageServerData } from "./$types";
    import { requestHeaders, membershipHeaders, cmPayoutHeaders, 
         savingsHeaders, csTransactionHeaders,
         loansHeaders, clTransactionHeaders } from "$lib/headers";

  
    export let data: NonNullable<PageServerData>;
  
    let rows = data["data"];
    let table = data["table"];

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
    
    const primaryKey =
    table === "request"
      ? requestHeaders[0]
      : table === "membership"
        ? membershipHeaders[0]
        : table === "cm_payout"
          ? cmPayoutHeaders[0]
          : table === "savingsaccounts"
            ? savingsHeaders[0]
            : table === "cs_transaction"
              ? csTransactionHeaders[0]
              : table === "loanrecords"
                ? loansHeaders[0]
                : table === "cl_transaction"
                  ? clTransactionHeaders[0]
                  : undefined;
    
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
  
    const handleEdit = async (id: number) => {
      await fetch("/cooperative/api/database/edit", {
        method: "POST",
        body: JSON.stringify({
          id,
          table
        }),
      });
    };
  
    const handleDelete = async (id: number) => {
      await fetch("/cooperative/api/database/delete", {
        method: "POST",
        body: JSON.stringify({
          id,
          table
        }),
      });
    };

  </script>
  
  <main class="w-full">
    <Breadcrumb
      items={[
        { href: "/dashboard/cooperative", text: "Cooperative" },
        { href: `/dashboard/cooperative/${table}`, text: pageTitle },
      ]}
    />
  
    <Search class="mb-8">
      <Button class="bg-activeb">Search</Button>
    </Search>
  
    <div class="ml-9 mb-20">
      <span class="text-xl mb-40 text-center font-bold"
        >No exact match found.</span
      >
    </div>
  
    <a
      href="/dashboard/cooperative/{table}/add"
      class="bg-buttonp rounded-lg z-4 border-2 w-40 border-outline p-3 mb-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
    >
      <span class="text-3xl material-symbols-outlined mr-2"> add </span>
      <div class="flex flex-col h-full">
        <span>Add an Entry</span>
      </div>
    </a>
    <Table
      {primaryKey}
      {headers}
      {rows}
      {handleEdit}
      {handleDelete}
    />
  </main>
  
