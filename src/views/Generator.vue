<template>
  <div>
    <Card>
      <div class="flex space-x-1">
        <h1 class="flex-grow text-dark-700 dark:text-dark-300 font-bold text-3xl">
          JSON to PHP class converter
        </h1>
        <ThemeColorSwitch class="flex-none w-6 h-6 mt-2" />
      </div>

      <div class="text-dark-600 dark:text-dark-400 mt-0 mb-6">
        Generate PHP classes from JSON
      </div>

      <Label for="json-input">
        Json input
      </Label>
      <TextArea
        id="json-input"
        v-model="jsonContent"
        class="mb-4"
        placeholder="Paste JSON content here..."
      />

      <Label for="json-input">
        Namespace
      </Label>
      <TextInput
        id="namespace"
        v-model="settings.namespace"
        class="mb-4"
        placeholder="App\Data"
      />

      <Label for="json-input">
        Root Class
      </Label>
      <TextInput
        id="namespace"
        v-model="rootClass"
        class="mb-4"
        placeholder="CancellationResponse"
      />

      <h2 class="text-dark-700 dark:text-dark-300 font-bold text-2xl mb-2">
        Settings
      </h2>

      <Settings v-model="settings" />
    </Card>
    <Card v-if="code && ! settings.download" id="code">
      <Code
        :code="code"
        language="php"
      />
    </Card>
    <Card v-show="code && settings.download" id="downloads">
    </Card>
    <Card v-if="error">
      <Alert>
        {{ error }}
      </Alert>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Alert from '@/components/Alert.vue';
import Card from '@/components/Card.vue';
import Label from '@/components/form/Label.vue';
import TextArea from '@/components/form/TextArea.vue';
import TextInput from '@/components/form/TextInput.vue';
import ThemeColorSwitch from '@/components/ThemeColorSwitch.vue';
import Settings from '@/components/Settings.vue';
import Code from '@/components/Code.vue'
import { useJsonConverter } from '@/hooks/use-json-converter';
import { useSettings } from '@/hooks/use-settings';

const jsonContent = ref('');
const namespace = ref('')
const rootClass = ref('')

const { settings } = useSettings();
const { error, code } = useJsonConverter({ 
  jsonContent, 
  rootClass,
  settings 
})
</script>
