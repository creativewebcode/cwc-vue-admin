<template>
  <!--begin::List Widget 9-->
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header align-items-center border-0 mt-4">
      <h3 class="card-title align-items-start flex-column">
        <span class="font-weight-bolder text-dark">
          {{ $t("GENERAL.DASHBOARD.RECENT_ACTIVITIES") }}
        </span>
        <span class="text-muted mt-3 font-weight-bold font-size-sm">
          {{ $n(19524, "currency", $t("CURRENCY")) }}
          {{ $t("GENERAL.DASHBOARD.SALES") }}
        </span>
      </h3>
      <div class="card-toolbar">
        <Dropdown2></Dropdown2>
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-4">
      <div class="timeline timeline-6 mt-3">
        <template v-for="(item, i) in list">
          <!--begin::Item-->
          <div class="timeline-item align-items-start" v-bind:key="i">
            <!--begin::Label-->
            <div
              class="timeline-label font-weight-bolder text-dark-75 font-size-lg"
            >
              {{ item.time }}
            </div>
            <!--end::Label-->

            <!--begin::Badge-->
            <div class="timeline-badge">
              <i class="icon-xxl" v-bind:class="item.badge"></i>
            </div>
            <!--end::Badge-->

            <!--begin::Text-->
            <div
              class="font-weight-mormal font-size-sm timeline-content text-muted pl-3"
            >
              <span
                v-bind:class="{
                  'font-weight-bolder text-dark-75': item.bold,
                  'mr-4': item.images
                }"
                v-html="item.desc"
              ></span>

              <!--begin::Section-->
              <div class="d-flex align-items-start mt-n2">
                <template v-for="(image, i) in item.images">
                  <!--begin::Symbol-->
                  <a
                    href="#"
                    class="symbol symbol-35 symbol-light-success mr-2"
                    v-bind:key="i"
                  >
                    <span class="symbol-label">
                      <img
                        :src="image.img"
                        class="h-75 align-self-end"
                        :alt="image.alt"
                      />
                    </span>
                  </a>
                  <!--end::Symbol-->
                </template>
              </div>
              <!--end::Section-->
            </div>
            <!--end::Text-->
          </div>
          <!--end::Item-->
        </template>
      </div>
      <!--end: Items-->
    </div>
    <!--end: Card Body-->
  </div>
  <!--end: Card-->
  <!--end: List Widget 9-->
</template>

<script>
import Dropdown2 from "@/view/content/dropdown/Dropdown2.vue";
import { mapGetters } from "vuex";

export default {
  name: "widget-9",
  data() {
    return {};
  },
  components: {
    Dropdown2
  },
  computed: {
    ...mapGetters(["layoutConfig", "list"])
  }
};
</script>
