/**
 * site-helper.js – 页面提示卡片、关键词徽章和访问说明
 * 不依赖第三方库，纯原生实现
 */

(function () {
  'use strict';

  // ---------- 配置 ----------
  const SITE_URL = 'https://m-home-aiyouxi.com.cn';
  const KEYWORD = '爱游戏';

  // ---------- 数据 ----------
  const tips = [
    { icon: '💡', text: '本站提供最新游戏资讯与攻略', link: SITE_URL + '/tips' },
    { icon: '🔥', text: '每日更新热门推荐，不要错过', link: SITE_URL + '/hot' },
    { icon: '🎮', text: '爱游戏玩家社区欢迎你', link: SITE_URL + '/community' }
  ];

  const badges = [
    { label: KEYWORD, color: '#ff6b6b' },
    { label: '热门', color: '#feca57' },
    { label: '新游', color: '#48dbfb' },
    { label: '攻略', color: '#ff9ff3' }
  ];

  // ---------- 样式注入 ----------
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .sh-card {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        padding: 16px;
        margin: 12px 0;
        transition: transform 0.2s ease;
      }
      .sh-card:hover {
        transform: translateY(-2px);
      }
      .sh-card-icon {
        font-size: 1.6em;
        margin-right: 10px;
      }
      .sh-card-link {
        text-decoration: none;
        color: #0984e3;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
      }
      .sh-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 20px;
        color: white;
        font-size: 0.85em;
        margin: 4px 6px 4px 0;
        white-space: nowrap;
      }
      .sh-notice {
        background: #dfe6e9;
        border-left: 4px solid #0984e3;
        padding: 12px 16px;
        border-radius: 6px;
        margin: 10px 0;
        line-height: 1.5;
      }
      .sh-notice a {
        color: #0984e3;
        text-decoration: underline;
      }
    `;
    document.head.appendChild(style);
  }

  // ---------- 创建提示卡片 ----------
  function createTipCard(tip) {
    const card = document.createElement('div');
    card.className = 'sh-card';
    const link = document.createElement('a');
    link.className = 'sh-card-link';
    link.href = tip.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    const iconSpan = document.createElement('span');
    iconSpan.className = 'sh-card-icon';
    iconSpan.textContent = tip.icon;
    const textSpan = document.createElement('span');
    textSpan.textContent = tip.text;
    link.appendChild(iconSpan);
    link.appendChild(textSpan);
    card.appendChild(link);
    return card;
  }

  // ---------- 创建关键词徽章 ----------
  function createBadge(badge) {
    const span = document.createElement('span');
    span.className = 'sh-badge';
    span.style.backgroundColor = badge.color;
    span.textContent = badge.label;
    return span;
  }

  // ---------- 创建访问说明 ----------
  function createAccessNotice() {
    const div = document.createElement('div');
    div.className = 'sh-notice';
    div.innerHTML = `🔍 访问说明：您正在浏览 <strong>${KEYWORD}</strong> 相关内容。` +
      `更多信息请访问 <a href="${SITE_URL}" target="_blank" rel="noopener noreferrer">${SITE_URL}</a> 。` +
      `所有数据仅供参考，请遵守平台规则。`;
    return div;
  }

  // ---------- 渲染到指定容器 ----------
  function render() {
    const container = document.getElementById('sh-helper-root');
    if (!container) return;

    // 清除已有内容
    container.innerHTML = '';

    // 提示卡片
    const tipsSection = document.createElement('div');
    tipsSection.style.marginBottom = '16px';
    tips.forEach(tip => {
      tipsSection.appendChild(createTipCard(tip));
    });
    container.appendChild(tipsSection);

    // 关键词徽章
    const badgesSection = document.createElement('div');
    badgesSection.style.marginBottom = '16px';
    badgesSection.style.display = 'flex';
    badgesSection.style.flexWrap = 'wrap';
    badges.forEach(badge => {
      badgesSection.appendChild(createBadge(badge));
    });
    container.appendChild(badgesSection);

    // 访问说明
    container.appendChild(createAccessNotice());
  }

  // ---------- 初始化 ----------
  function init() {
    injectStyles();
    // 确保页面加载完成后渲染
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', render);
    } else {
      render();
    }
  }

  // 启动
  init();
})();