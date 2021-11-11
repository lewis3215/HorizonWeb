<template>
  <div class="flex">
    <!-- {{ allSelected.toString() }} -->
    <div class="button">
      <div
        class="checkbox-select__trigger"
        :class="{ isActive: activeTrigger }"
        @click="showDropdown"
      >
        <span class="checkbox-select__title">Select columns</span>
        <i class="ri-arrow-drop-down-line" />
      </div>
      <div
        id="dropdown"
        class="checkbox-select__dropdown"
        :class="{ activeSearch: showLoader, 'hidden': !dropdown }"
      >
        <div class="checkbox-select__search-wrapp">
          <input
            v-model="search"
            type="text"
            placeholder="search filters..."
            @focus="showLoader = true"
            @blur="showLoader = false"
          >
        </div>

        <div class="checkbox-select__col">
          <div class="checkbox-select__select-all">
            <label for="selectAll">{{ allSelected ? 'Clear All' : 'Select All' }}</label>
            <input
              id="selectAll"
              type="checkbox"
              @click="checkedFilters = allSelected ? [] : filters"
            >
          </div>
          <div class="checkbox-select__info">
            {{ checkedFilters.length }} SELECTED
          </div>
        </div>

        <ul
          id="customScroll"
          class="checkbox-select__filters-wrapp"
          data-simplebar-auto-hide="false"
        >
          <li
            v-for="(filter, index) in filteredList"
            :key="index"
          >
            <div class="checkbox-select__check-wrapp">
              <input
                :id="index"
                v-model="checkedFilters"
                class="conditions-check"
                :value="filter"
                type="checkbox"
              >
              <i :class="checkedFilters.includes(filter) ? { 'ri-checkbox-blank-fill': true } : { 'ri-checkbox-blank-line': true }" />
              <label :for="index">{{ filter }}</label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

const equalArray = (a, b) => {
  if (a.length === b.length) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false
      }
    }
    return true
  } else {
    return false
  }
}

export default {
  name: 'SelectMultiCheckbox',
  props: {
    filters: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      search: '',
      allSelected: equalArray(this.modelValue, this.filters),
      activeTrigger: false,
      dropdown: false,
      showLoader: false
    }
  },
  computed: {
    filteredList () {
      return this.filters.filter((item) => {
        return item.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    checkedFilters: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.allSelected = equalArray(value, this.filters)
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    showDropdown () {
      if (this.dropdown === false) {
        this.dropdown = true
        this.activeTrigger = true
      } else {
        this.dropdown = false
        this.activeTrigger = false
      }
    }
  }
}
</script>

<style lang="scss">
.checkbox-select {
  position: relative;
  max-width: 220px; // 440px
  width: 100%;
  @media only screen and (max-width: 600px) {
    margin: 100px auto 0;
  }
  &__dropdown {
    background: #fff;
    font-family: AtkinsonHyperlegible;
    color: black;
    position: absolute;
    left: 0;
    right: 0;

    &.activeSearch {
      display: block;
      // &:after {
      //   opacity: 1;
      // }
    }
  }
  // &__search-wrapp {
  //   padding: 10px 25px 5px;
  //   @media only screen and (max-width: 600px) {
  //     padding: 10px 15px 5px;
  //   }
  //   input {
  //     width: 100%;
  //     height: 40px;
  //     border-width: 0 0 2px;
  //     border-style: solid;
  //     border-color: #000;
  //     font-size: 16px;
  //     background: transparent;
  //   }
  // }
  &__col {
    display: flex;
    font-size: 12px;
    padding: 0 25px;
    justify-content: space-between;
    text-transform: uppercase;
    @media only screen and (max-width: 600px) {
      padding: 0 15px;
    }
  }
  &__select-all {
    label {
      cursor: pointer;
    }
    input {
      display: none;
    }
  }
  &__filters-wrapp {
    margin-top: 20px;
    height: 157px;
    overflow-y: auto;
  }

  &__check-wrapp {
    // position: relative;
    // padding: 0 25px;
    // margin-bottom: 5px;
    // @media only screen and (max-width: 600px) {
    //   padding: 0 15px;
    // }
    input[type="checkbox"] {
      display: none;

      & + label {
        position: relative;
        cursor: pointer;
        font-size: 16px;
        line-height: 22px;
        padding-left: 30px;
        display: inline-block;
        // -webkit-touch-callout: none;
        // -webkit-user-select: none;
        // -khtml-user-select: none;
        // -moz-user-select: none;
        // -ms-user-select: none;
        // user-select: none;
        // transition: padding 0.25s ease;
        // &:after {
        //   border: solid 2px #000;
        //   content: "";
        //   width: 22px;
        //   height: 22px;
        //   top: 0;
        //   left: 0;
        //   position: absolute;
        // }
        &:before {
          width: 14px;
          height: 14px;
          content: "";
          position: absolute;
          top: 4px;
          left: 4px;
          background-color: #000;
          opacity: 0;
          will-change: transform;
          transform: scale(0.5);
          transition: all 0.2s ease;
        }
        &:hover {
          padding-left: 32px;
        }
      }
      &:checked {
        & + label {
          &:before {
            opacity: 1;
            transform: scale(1);
          }
        }
      }
    }
  }
}
</style>
