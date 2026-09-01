import CardArticleHighlight from "../components/Card/CardArticleHighlight.vue";

export default {
  title: 'Components/Card/CardArticleHighlight',
  component: CardArticleHighlight,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card Article Highlight untuk menampilkan artikel unggulan dengan overlay gambar, label kategori, judul dan tanggal.',
      },
    },
    layout: 'fullscreen',
  },
  decorators: [
    () => ({
      template: `
        <div style="width: 100%; padding: 24px;">
          <story />
        </div>
      `,
    }),
  ],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array artikel dengan format { title, label, tag, name, date }',
    },
  },
  args: {
    items: [
      {
        title: "Cara Jualan Online Selama Bulan Ramadan",
        label: "Inspirasi",
        tag: "Inspirasi",
        name: "name_1",
        date: "16 December 2020",
      },
      {
        title: "Ide Jualan Online Selama Bulan Ramadan",
        label: "Inspirasi",
        tag: "Inspirasi",
        name: "name_2",
        date: "16 December 2020",
      },
    ],
  },
};

export const Default = {
  args: {
    items: [
      {
        title: "Cara Jualan Online Selama Bulan Ramadan",
        label: "Inspirasi",
        tag: "Inspirasi",
        name: "article_1",
        date: "16 December 2020",
      },
      {
        title: "Ide Jualan Online Selama Bulan Ramadan",
        label: "Tips & Trik",
        tag: "Tips",
        name: "article_2",
        date: "17 December 2020",
      },
    ],
  },
};

export const SingleArticle = {
  args: {
    items: [
      {
        title: "Tips Investasi Emas untuk Pemula",
        label: "Edukasi",
        tag: "Edukasi",
        name: "single_article",
        date: "20 Januari 2024",
      },
    ],
  },
};

export const MultipleArticles = {
  args: {
    items: [
      {
        title: "Cara Jualan Online Selama Bulan Ramadan",
        label: "Inspirasi",
        tag: "Inspirasi",
        name: "article_1",
        date: "16 December 2020",
      },
      {
        title: "Ide Jualan Online Selama Bulan Ramadan",
        label: "Tips",
        tag: "Tips",
        name: "article_2",
        date: "17 December 2020",
      },
      {
        title: "Strategi Marketing Digital di Era Modern",
        label: "Bisnis",
        tag: "Bisnis",
        name: "article_3",
        date: "18 December 2020",
      },
    ],
  },
};
