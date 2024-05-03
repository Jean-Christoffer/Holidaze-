<script lang="ts">
   export let visible = false;
   export let onClick: () => void;
  

  </script>
  
  <div class:visible>
    <div class="modal-overlay" on:click={onClick}></div>
    <div class="modal">
      <button class="close-button" on:click={onClick}>&times;</button>
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
  <style>
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }
  
    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 8px;
      padding: 20px;
      z-index: 1000;
    }
  
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      border: none;
      background: transparent;
      font-size: 1.5rem;
      cursor: pointer;
    }
  
    .modal-content {
      max-width: 80vw;
      max-height: 80vh;
      overflow: auto;
    }
  
    /* Hide modal when not visible */
    .visible {
      display: block;
    }
  
    .visible .modal {
      display: block;
    }
  
    .visible .modal-overlay {
      display: block;
    }
  
    /* Hide modal when not visible */
    .hidden {
      display: none;
    }
  </style>