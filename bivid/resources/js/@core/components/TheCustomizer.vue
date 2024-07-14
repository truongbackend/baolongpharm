<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useTheme } from 'vuetify'
import { staticPrimaryColor } from '@/plugins/vuetify/theme'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import {
  RouteTransitions,
  Skins,
} from '@core/enums'
import {
  AppContentLayoutNav,
  ContentWidth,
  FooterType,
  NavbarType,
} from '@layouts/enums'
import { themeConfig } from '@themeConfig'

const isNavDrawerOpen = ref(false)
const { theme, skin, appRouteTransition, navbarType, footerType, isVerticalNavCollapsed, isVerticalNavSemiDark, appContentWidth, appContentLayoutNav, isAppRtl, isNavbarBlurEnabled, isLessThanOverlayNavBreakpoint } = useThemeConfig()

const vuetifyTheme = useTheme()
const initialThemeColors = JSON.parse(JSON.stringify(vuetifyTheme.current.value.colors))

const colors = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
]

const setPrimaryColor = color => {
  const currentThemeName = vuetifyTheme.name.value

  vuetifyTheme.themes.value[currentThemeName].colors.primary = color
  localStorage.setItem(`${ themeConfig.app.title }-${ currentThemeName }ThemePrimaryColor`, color)
  localStorage.setItem(`${ themeConfig.app.title }-initial-loader-color`, color)
}

const getBoxColor = (color, index) => index ? color : staticPrimaryColor
const { width: windowWidth } = useWindowSize()

const headerValues = computed(() => {
  const entries = Object.entries(NavbarType)
  if (appContentLayoutNav.value === AppContentLayoutNav.Horizontal)
    return entries.filter(([_, val]) => val !== NavbarType.Hidden)
  
  return entries
})
</script>

<template>
  <template v-if="!isLessThanOverlayNavBreakpoint(windowWidth)">
    <VBtn
      icon
      size="small"
      class="app-customizer-toggler rounded-s-lg rounded-0"
      style="z-index: 1001;"
      @click="isNavDrawerOpen = true"
    >
      <VIcon
        size="22"
        icon="tabler-settings"
      />
    </VBtn>
    <VNavigationDrawer
      v-model="isNavDrawerOpen"
      temporary
      border="0"
      location="end"
      width="400"
      :scrim="false"
      class="app-customizer"
    >
      <div class="customizer-heading d-flex align-center justify-space-between">
        <div>
          <h6 class="text-h6">
            Tuỷ chỉnh giao diện
          </h6>
          <span class="text-body-1">Tùy chỉnh và xem trước trong thời gian thực</span>
        </div>
        <IconBtn @click="isNavDrawerOpen = false">
          <VIcon
            icon="tabler-x"
            size="20"
          />
        </IconBtn>
      </div>

      <VDivider />

      <PerfectScrollbar
        tag="ul"
        :options="{ wheelPropagation: false }"
      >
        <CustomizerSection
          title="Giao diện"
          :divider="false"
        >
          <h6 class="text-base font-weight-regular">
            Màu da
          </h6>
          <VRadioGroup
            v-model="skin"
            inline
          >
            <VRadio
              v-for="[key, val] in Object.entries(Skins)"
              :key="key"
              :label="key"
              :value="val"
            />
          </VRadioGroup>
          <h6 class="mt-3 text-base font-weight-regular">
            Giao diện
          </h6>
          <VRadioGroup
            v-model="theme"
            inline
          >
            <VRadio
              v-for="themeOption in ['Mặc định', 'Sáng', 'Tối']"
              :key="themeOption"
              :label="themeOption"
              :value="themeOption"
              class="text-capitalize"
            />
          </VRadioGroup>
          <h6 class="mt-3 text-base font-weight-regular">
            Màu sắc chính
          </h6>
          <div class="d-flex gap-x-4 mt-2">
            <div
              v-for="(color, index) in colors"
              :key="color"
              style=" border-radius: 0.5rem; block-size: 2.5rem;inline-size: 2.5rem; transition: all 0.25s ease;"
              :style="{ backgroundColor: getBoxColor(initialThemeColors[color], index) }"
              class="cursor-pointer d-flex align-center justify-center"
              :class="{ 'elevation-4': vuetifyTheme.current.value.colors.primary === getBoxColor(initialThemeColors[color], index) }"
              @click="setPrimaryColor(getBoxColor(initialThemeColors[color], index))"
            >
              <VFadeTransition>
                <VIcon
                  v-show="vuetifyTheme.current.value.colors.primary === (getBoxColor(initialThemeColors[color], index))"
                  icon="tabler-check"
                  color="white"
                />
              </VFadeTransition>
            </div>
          </div>
        </CustomizerSection>
        <CustomizerSection title="LAYOUT">
          <h6 class="text-base font-weight-regular">
            Độ rộng nội dung
          </h6>
          <VRadioGroup
            v-model="appContentWidth"
            inline
          >
            <VRadio
              v-for="[key, val] in Object.entries(ContentWidth)"
              :key="key"
              :label="key"
              :value="val"
            />
          </VRadioGroup>
          <h6 class="mt-3 text-base font-weight-regular">
            {{ appContentLayoutNav === AppContentLayoutNav.Vertical ? 'Navbar' : 'Header' }} Type
          </h6>
          <VRadioGroup
            v-model="navbarType"
            inline
          >
            <VRadio
              v-for="[key, val] in headerValues"
              :key="key"
              :label="key"
              :value="val"
            />
          </VRadioGroup>
          <h6 class="mt-3 text-base font-weight-regular">
            Chân trang
          </h6>
          <VRadioGroup
            v-model="footerType"
            inline
          >
            <VRadio
              v-for="[key, val] in Object.entries(FooterType)"
              :key="key"
              :label="key"
              :value="val"
            />
          </VRadioGroup>
          <div class="mt-4 d-flex align-center justify-space-between">
            <VLabel
              for="customizer-navbar-blur"
              class="text-high-emphasis"
            >
              Navbar Blur
            </VLabel>
            <div>
              <VSwitch
                id="customizer-navbar-blur"
                v-model="isNavbarBlurEnabled"
                class="ms-2"
              />
            </div>
          </div>
        </CustomizerSection>
        <CustomizerSection title="MENU">
          <h6 class="text-base font-weight-regular">
            Menu Type
          </h6>
          <VRadioGroup
            v-model="appContentLayoutNav"
            inline
          >
            <VRadio
              v-for="[key, val] in Object.entries(AppContentLayoutNav)"
              :key="key"
              :label="key"
              :value="val"
            />
          </VRadioGroup>
          <div
            v-if="appContentLayoutNav === AppContentLayoutNav.Vertical"
            class="mt-4 d-flex align-center justify-space-between"
          >
            <VLabel
              for="customizer-menu-collapsed"
              class="text-high-emphasis"
            >
              Thu gọn menu
            </VLabel>
            <div>
              <VSwitch
                id="customizer-menu-collapsed"
                v-model="isVerticalNavCollapsed"
                class="ms-2"
              />
            </div>
          </div>
          <div
            class="mt-4 align-center justify-space-between"
            :class="vuetifyTheme.global.name.value === 'light' && appContentLayoutNav === AppContentLayoutNav.Vertical ? 'd-flex' : 'd-none'"
          >
            <VLabel
              for="customizer-menu-semi-dark"
              class="text-high-emphasis"
            >
              Đổi màu tối
            </VLabel>
            <div>
              <VSwitch
                id="customizer-menu-semi-dark"
                v-model="isVerticalNavSemiDark"
                class="ms-2"
              />
            </div>
          </div>
        </CustomizerSection>
      </PerfectScrollbar>
    </VNavigationDrawer>
  </template>
</template>

<style lang="scss">
.app-customizer {
  .customizer-section {
    padding: 1.25rem;
  }

  .customizer-heading {
    padding-block: 0.875rem;
    padding-inline: 1.25rem;
  }

  .v-navigation-drawer__content {
    display: flex;
    flex-direction: column;
  }
}

.app-customizer-toggler {
  position: fixed !important;
  inset-block-start: 50%;
  inset-inline-end: 0;
}
</style>
