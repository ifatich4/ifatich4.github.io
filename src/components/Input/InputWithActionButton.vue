<script setup>
import {defineProps, defineEmits} from "vue"
	const props = defineProps({
    buttonTitle: {
        type: String,
        default: 'Button',
    },
});

defineEmits(['click'])

</script>

<template>
	<div class="flex flex-row gap-3 align-items-end">
		<div class="input-molecule">
			<slot name="input"/>
		</div>
		<BButton size="md" class="button-action" @click="$emit('click', $event)">{{ props.buttonTitle }}</BButton>
	</div>
</template>

<style lang="scss">
	
.input-molecule {
	width: 100%;

	.group-input{
		margin-bottom: 0px;
	}
}

.button-molecule{
	width: 300px;
}

.button-action{
	min-width: 120px;
	width: fit-content;
	height: 48px;
	white-space: nowrap;
}
</style>