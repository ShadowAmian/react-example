
export default {
  plugins: [
    ['umi-plugin-react', {
      dva: true,
      routes: [
        { path: '/', component: './src/pages/index.tsx' },
      ],
    }],
  ],
 
}
