<template>
  <!-- begin:: Footer -->
  <div class="footer bg-white py-4 d-flex flex-lg-column" id="kt_footer">
    <div
      class="d-flex align-items-center justify-content-between"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <div class="text-dark">
        <span class="text-muted font-weight-bold mr-2">
          2020 &nbsp;&copy;&nbsp;
        </span>
        <a
          href="https://creativewebcode.com/"
          target="_blank"
          class="text-dark-75 text-hover-primary"
        >
          Creative Web Code
        </a>
      </div>
      <div class="nav nav-dark">
        <a
          href="https://creativewebcode.com/about"
          target="_blank"
          class="nav-link pr-3 pl-0"
        >
          About
        </a>
        <a
          href="https://creativewebcode.com/team"
          target="_blank"
          class="nav-link px-3"
        >
          Team
        </a>
        <a
          href="https://creativewebcode.com/contact"
          target="_blank"
          class="nav-link pl-3 pr-0"
        >
          Contact
        </a>
      </div>
    </div>
  </div>
  <!-- end:: Footer -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CWCFooter",
  computed: {
    ...mapGetters(["layoutConfig"]),

    /**
     * Check if footer container is fluid
     */
    widthFluid() {
      return this.layoutConfig("footer.width") === "fluid";
    }
  }
};
</script>
