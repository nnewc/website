const currentDateUTC = new Date().toUTCString()

module.exports = {
	title: "Nathan Newcomb",
	dest: './public',
	themeConfig: {
		repo: 'nnewc/my-blog',
		repoLabel: 'Repo',
		editLinks: true,
		editLinkText: 'Found a bug? Help me improve this page!',
		nav: [
			{ text: 'Home', link: '/' }, 
			{ text: 'Blog', link: '/blog/' },
			{ text: 'Archive', link: '/archive/' },
			{ text: 'Resume', link: 'https://www.linkedin.com/in/nathan-newcomb-71899928/'}
		],
		logo: '/vuepress-blog-logo.png',
		docsDir: 'src',
		pageSize: 5,
		startPage: 0,
		lastUpdated: 'Last updated'
	},
	plugins: [
		[
			'@vuepress/google-analytics',
			{
				ga: 'UA-156096525-1'
			}
		],
		[
			'vuepress-plugin-rss',
			{
				base_url: '/',
				site_url: 'https://vuepressblog.org',
				filter: frontmatter => frontmatter.date <= new Date(currentDateUTC),
				count: 20
			}
		],
		'vuepress-plugin-reading-time',
		'vuepress-plugin-janitor'
	],
	head: [
		['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon.png' }],
		['link', { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' }],
		['link', { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' }],
		['link', { rel: 'manifest', href: '/site.webmanifest' }],
		['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }],
		['meta', { name: 'msapplication-TileColor', content: '#da532c' }],
		['meta', { name: 'theme-color', content: '#ffffff' }]
	]
}
