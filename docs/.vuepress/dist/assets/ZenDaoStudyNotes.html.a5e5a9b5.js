import{_ as a,c as e}from"./app.269701b8.js";const s={},n=e(`<h1 id="\u7985\u9053\u5B66\u4E60\u7B14\u8BB0" tabindex="-1"><a class="header-anchor" href="#\u7985\u9053\u5B66\u4E60\u7B14\u8BB0" aria-hidden="true">#</a> \u7985\u9053\u5B66\u4E60\u7B14\u8BB0</h1><h2 id="\u80CC\u666F" tabindex="-1"><a class="header-anchor" href="#\u80CC\u666F" aria-hidden="true">#</a> \u80CC\u666F</h2><p>\u7985\u9053\u4F5C\u4E3A\u8001\u724C\u56FD\u4EA7ALM\uFF0C\u65E2\u6709\u9AD8\u4E8E\u540C\u7EA7\u522B\u5DE5\u5177\uFF08\u5982Redmine/JIRA\uFF09\u7684\u5168\u6D41\u7A0B\u7BA1\u63A7\uFF08\u5982\u4EA7\u54C1\u7BA1\u7406/\u6D4B\u8BD5\u6267\u884C\u7BA1\u7406\uFF09\uFF0C\u53C8\u5728\u5DE5\u4F5C\u6D41\u4E0A\u4E0D\u5177\u6709\u57FA\u672C\u7684\u53EF\u5B9A\u5236\u6027\uFF0C\u603B\u662F\u975E\u5E38\u975E\u5E38\u5177\u6709\u7279\u8272\uFF0C\u4E4B\u524D\u6CA1\u6709\u975E\u5E38\u7CFB\u7EDF\u6027\u7814\u7A76\uFF0C\u5DE5\u4F5C\u539F\u56E0\u505A\u4E00\u4E9B\u5907\u5FD8</p><h2 id="\u57FA\u7840\u8BBE\u65BD" tabindex="-1"><a class="header-anchor" href="#\u57FA\u7840\u8BBE\u65BD" aria-hidden="true">#</a> \u57FA\u7840\u8BBE\u65BD</h2><h3 id="\u90E8\u7F72" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72" aria-hidden="true">#</a> \u90E8\u7F72</h3><p>\u7985\u9053\u662FPHP\u67B6\u6784\u7684B/S\u7CFB\u7EDF\u4EA6\u652F\u6301Docker</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">docker</span> run --name zentao -p <span class="token number">81</span>:80  -v /srv/zentaopms:/www/zentaopms -v /srv/mysqldata:/var/lib/mysql -e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> -d easysoft/zentao:16.5
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="\u5907\u4EFD\u6062\u590D\u673A\u5236" tabindex="-1"><a class="header-anchor" href="#\u5907\u4EFD\u6062\u590D\u673A\u5236" aria-hidden="true">#</a> \u5907\u4EFD\u6062\u590D\u673A\u5236</h3>`,8);function r(t,d){return n}var o=a(s,[["render",r],["__file","ZenDaoStudyNotes.html.vue"]]);export{o as default};