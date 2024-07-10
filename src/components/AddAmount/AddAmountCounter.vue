<template>
    <div class="input-group add-amount-counter">
        <div class="add-amount-counter-box">
            <a class="add-amount-counter-box__button btn-decrement" @click="decrementValue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  :class="{ 'green-icon': countValue > 0 }">
                    <!-- SVG untuk decrement -->
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7 12C7 12.55 7.45 13 8 13H16C16.55 13 17 12.55 17 12C17 11.45 16.55 11 16 11H8C7.45 11 7 11.45 7 12ZM4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4C7.59 4 4 7.59 4 12Z" />
                </svg>
            </a>
            <div class="add-amount-counter-box__content">
                <input type="tel" id="sumGold" class="add-amount-counter-box__input" :value="countValue"
                    @input="handleChange" minlength="1" required />
            </div>
            <a class="add-amount-counter-box__button btn-increment" @click="incrementValue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#00ab4e" xmlns="http://www.w3.org/2000/svg">
                    <!-- SVG untuk increment -->
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 7C11.45 7 11 7.45 11 8V11H8C7.45 11 7 11.45 7 12C7 12.55 7.45 13 8 13H11V16C11 16.55 11.45 17 12 17C12.55 17 13 16.55 13 16V13H16C16.55 13 17 12.55 17 12C17 11.45 16.55 11 16 11H13V8C13 7.45 12.55 7 12 7ZM4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4C7.59 4 4 7.59 4 12Z" />
                </svg>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddAmount",
        data() {
            return {
                countValue: 1,
            };
        },
        methods: {
            handleChange(event) {
                let newCount = parseInt(event.target.value);
                if (isNaN(newCount) || newCount < 1) {
                    newCount = 1;
                }
                this.countValue = newCount;
            },
            incrementValue() {
                this.countValue++;
            },
            decrementValue() {
                if (this.countValue > 0) {
                    this.countValue--;
                }
            },
        },
    };
</script>

<style scoped>
    .green-icon {
        color: var(--g-kit-lime-50) !important;
    }
</style>