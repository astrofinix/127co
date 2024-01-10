<script lang = "ts">
import { Alert, Button } from 'flowbite-svelte';
import { InfoCircleSolid } from 'flowbite-svelte-icons';

export let message: string;
export let class: string;
</script>

<style>
    .cf:before,
    .cf:after {
      content: "";
      display: block;
    }
    .cf:after {
      clear: both;
    }
    #container {
      margin: auto;
      width: 24%; /* to have 2 divs per row */
  
      padding: 10px;
      position: fixed;
      top: 20px; /* Adjust this value based on your layout */
      right: 20px; /* Adjust this value based on your layout */
      
      padding: 10px;
     
      border-radius: 5px;
      z-index: 100; /* Ensure it's on top of other elements */
    }
    .float {
      float: left;
      font-size: 30px;
    }
  </style>

<div id="container" class="cf">
    <div class="float">
    <Alert class={class} dismissable>
      <InfoCircleSolid slot="icon" class="w-4 h-4" />
      {message}
      </Alert>
    </div>
  </div>