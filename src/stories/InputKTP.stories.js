import InputKTP from '../components/Input/InputKTP.vue'
import { ref } from 'vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Components/Input/InputKTP',
  component: InputKTP,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text shown in the dialog',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Upload Foto KTP' }
      }
    },
    userName: {
      control: 'text',
      description: 'Name to display on captured photo timestamp',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'unknown' }
      }
    },
    compressionMaxKb: {
      control: 'number',
      description: 'Maximum file size in KB for compression',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1024' }
      }
    },
    error: {
      control: 'text',
      description: 'Error message to display below the input',
      table: {
        type: { summary: 'string|object' },
        defaultValue: { summary: 'undefined' }
      }
    },
    uniqueKey: {
      control: 'text',
      description: 'Unique identifier for this input instance',
      table: {
        type: { summary: 'string|number' },
        defaultValue: { summary: 'undefined' }
      }
    },
    modelValue: {
      control: 'text',
      description: 'V-model binding for the image data URL',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'empty string' }
      }
    }
  },
  args: {
    title: 'Upload Foto KTP',
    userName: 'John Doe',
    compressionMaxKb: 1024,
    error: undefined,
    uniqueKey: 'ktp-input-1'
  }
}

/**
 * Default state with empty file picker
 * User can choose between camera or gallery
 */
export const Default = {
  args: {
    title: 'Upload Foto KTP',
    userName: 'John Doe',
    compressionMaxKb: 1024,
    error: undefined,
    uniqueKey: 'ktp-input-1'
  },
  render: (args) => ({
    components: { InputKTP },
    setup() {
      const fileSrc = ref('')
      return {
        args,
        fileSrc
      }
    },
    template: `
      <div style="max-width: 400px; margin: 20px;">
        <h3>Upload KTP Photo</h3>
        <InputKTP 
          v-model="fileSrc"
          :title="args.title"
          :userName="args.userName"
          :compressionMaxKb="args.compressionMaxKb"
          :error="args.error"
          :uniqueKey="args.uniqueKey"
          @fileDropped="(file) => console.log('File dropped:', file)"
          @fileRemoved="() => console.log('File removed')"
          @errorPermission="(err) => console.log('Permission error:', err)"
        />
      </div>
    `
  })
}

/**
 * With error message displayed
 */
export const WithError = {
  args: {
    title: 'Upload Foto KTP',
    userName: 'John Doe',
    compressionMaxKb: 1024,
    error: 'Foto KTP harus jelas dan tidak ada bayangan',
    uniqueKey: 'ktp-input-error'
  },
  render: (args) => ({
    components: { InputKTP },
    setup() {
      const fileSrc = ref('')
      return {
        args,
        fileSrc
      }
    },
    template: `
      <div style="max-width: 400px; margin: 20px;">
        <h3>With Error State</h3>
        <InputKTP 
          v-model="fileSrc"
          :title="args.title"
          :userName="args.userName"
          :compressionMaxKb="args.compressionMaxKb"
          :error="args.error"
          :uniqueKey="args.uniqueKey"
          @fileDropped="(file) => console.log('File dropped:', file)"
          @fileRemoved="() => console.log('File removed')"
          @errorPermission="(err) => console.log('Permission error:', err)"
        />
      </div>
    `
  })
}

/**
 * Small compression (256KB)
 * Useful for low bandwidth scenarios
 */
export const SmallCompression = {
  args: {
    title: 'Upload Foto KTP (Low Quality)',
    userName: 'Jane Smith',
    compressionMaxKb: 256,
    error: undefined,
    uniqueKey: 'ktp-input-small'
  },
  render: (args) => ({
    components: { InputKTP },
    setup() {
      const fileSrc = ref('')
      return {
        args,
        fileSrc
      }
    },
    template: `
      <div style="max-width: 400px; margin: 20px;">
        <h3>Small File Size (256KB max)</h3>
        <p style="font-size: 12px; color: #666;">For low bandwidth connections</p>
        <InputKTP 
          v-model="fileSrc"
          :title="args.title"
          :userName="args.userName"
          :compressionMaxKb="args.compressionMaxKb"
          :error="args.error"
          :uniqueKey="args.uniqueKey"
          @fileDropped="(file) => console.log('File dropped:', file)"
          @fileRemoved="() => console.log('File removed')"
          @errorPermission="(err) => console.log('Permission error:', err)"
        />
      </div>
    `
  })
}

/**
 * Large compression (2048KB)
 * For high quality requirements
 */
export const LargeCompression = {
  args: {
    title: 'Upload Foto KTP (Kualitas Tinggi)',
    userName: 'Admin User',
    compressionMaxKb: 2048,
    error: undefined,
    uniqueKey: 'ktp-input-large'
  },
  render: (args) => ({
    components: { InputKTP },
    setup() {
      const fileSrc = ref('')
      return {
        args,
        fileSrc
      }
    },
    template: `
      <div style="max-width: 400px; margin: 20px;">
        <h3>Large File Size (2048KB max)</h3>
        <p style="font-size: 12px; color: #666;">For high quality scanning</p>
        <InputKTP 
          v-model="fileSrc"
          :title="args.title"
          :userName="args.userName"
          :compressionMaxKb="args.compressionMaxKb"
          :error="args.error"
          :uniqueKey="args.uniqueKey"
          @fileDropped="(file) => console.log('File dropped:', file)"
          @fileRemoved="() => console.log('File removed')"
          @errorPermission="(err) => console.log('Permission error:', err)"
        />
      </div>
    `
  })
}

/**
 * Custom title
 * Demonstrate custom dialog titles
 */
export const CustomTitle = {
  args: {
    title: 'Unggah Identitas Diri',
    userName: 'PT. Pegadaian',
    compressionMaxKb: 1024,
    error: undefined,
    uniqueKey: 'ktp-input-custom'
  },
  render: (args) => ({
    components: { InputKTP },
    setup() {
      const fileSrc = ref('')
      return {
        args,
        fileSrc
      }
    },
    template: `
      <div style="max-width: 400px; margin: 20px;">
        <h3>Custom Dialog Title</h3>
        <InputKTP 
          v-model="fileSrc"
          :title="args.title"
          :userName="args.userName"
          :compressionMaxKb="args.compressionMaxKb"
          :error="args.error"
          :uniqueKey="args.uniqueKey"
          @fileDropped="(file) => console.log('File dropped:', file)"
          @fileRemoved="() => console.log('File removed')"
          @errorPermission="(err) => console.log('Permission error:', err)"
        />
      </div>
    `
  })
}

/**
 * Basic usage in a form context
 * Shows how to integrate with a form
 */
export const FormIntegration = {
  args: {
    title: 'Upload Foto KTP',
    userName: 'Form User',
    compressionMaxKb: 1024,
    error: undefined,
    uniqueKey: 'form-ktp-1'
  },
  render: (args) => ({
    components: { InputKTP },
    setup() {
      const formData = ref({
        name: 'John Doe',
        ktpPhoto: ''
      })

      const handleFileDropped = (file, key) => {
        console.log('File dropped for key:', key)
        console.log('File details:', file)
      }

      return {
        args,
        formData,
        handleFileDropped
      }
    },
    template: `
      <div style="max-width: 500px; margin: 20px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h3>KTP Upload Form</h3>
        
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Nama Lengkap:</label>
          <input 
            v-model="formData.name" 
            type="text" 
            placeholder="Masukkan nama"
            style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Foto KTP:</label>
          <InputKTP 
            v-model="formData.ktpPhoto"
            :title="args.title"
            :userName="formData.name"
            :compressionMaxKb="args.compressionMaxKb"
            :error="args.error"
            :uniqueKey="args.uniqueKey"
            @fileDropped="handleFileDropped"
            @fileRemoved="() => console.log('File removed')"
            @errorPermission="(err) => console.log('Permission error:', err)"
          />
        </div>

        <div style="padding: 15px; background-color: #f0f0f0; border-radius: 4px;">
          <p><strong>Form Data:</strong></p>
          <pre style="margin: 0;">{{ JSON.stringify(formData, null, 2) }}</pre>
        </div>
      </div>
    `
  })
}

export const DocumentationProps = {
  parameters: {
    docs: {
      description: {
        component: `
## InputKTP Component Documentation

The InputKTP component provides a user-friendly interface for capturing or uploading KTP (Indonesian ID Card) photos. It supports both camera capture and gallery selection with automatic compression.

### Features
- 📷 Real-time camera capture with live preview
- 🖼️ Gallery selection alternative
- 📱 Responsive design (mobile fullscreen, desktop modal)
- 🔄 Switch between front/back camera
- 📊 Automatic image compression
- ⚠️ Error handling and validation
- ⏱️ Timestamp overlay on captured images
- 🎯 ID card crop guide overlay

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`compressionMaxKb\` | number | 1024 | Maximum compression size in KB |
| \`title\` | string | "Upload Foto KTP" | Dialog title text |
| \`userName\` | string | "unknown" | Name to display on timestamp |
| \`error\` | string/object | undefined | Error message to display |
| \`uniqueKey\` | string/number | undefined | Unique identifier for input |
| \`modelValue\` | string | "" | V-model for image data URL |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| \`fileDropped\` | file, uniqueKey | File selected/captured successfully |
| \`fileRemoved\` | uniqueKey | File removed from preview |
| \`errorPermission\` | error | Camera permission error |

### Usage Example

\`\`\`vue
<template>
  <InputKTP 
    v-model="ktpPhoto"
    title="Upload Foto KTP"
    userName="John Doe"
    :compressionMaxKb="1024"
    :error="validationError"
    uniqueKey="ktp-1"
    @fileDropped="handleFileSelected"
    @fileRemoved="handleFileRemoved"
    @errorPermission="handlePermissionError"
  />
</template>

<script setup>
import { ref } from 'vue'
import InputKTP from '@/components/Input/InputKTP.vue'

const ktpPhoto = ref('')
const validationError = ref('')

const handleFileSelected = (file, key) => {
  console.log('KTP Photo selected:', file)
  // Send to server
}

const handleFileRemoved = (key) => {
  console.log('KTP Photo removed')
}

const handlePermissionError = (error) => {
  validationError.value = 'Akses kamera ditolak: ' + error.message
}
</script>
\`\`\`

### Technical Details

- **Mobile Layout**: Fullscreen modal with custom header
- **Desktop Layout**: Centered modal with ID card crop guide
- **Image Processing**: Canvas-based compression with fallback
- **File Naming**: Random 64-character names for security
- **Responsive**: Detects orientation changes and adjusts UI

### Accessibility
- Proper ARIA labels on interactive elements
- Keyboard navigation support
- Clear error messages
- Timestamp visibility for verification
        `
      }
    }
  }
}
