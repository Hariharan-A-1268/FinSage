import requests
import xml.etree.ElementTree as ET
import json

def fetch_financial_news():
    def fetch_news(keyword, title):
        url = f"https://news.google.com/rss/search?q={keyword}&hl=en-IN&gl=IN&ceid=IN:en"
        response = requests.get(url, verify=False)
        root = ET.fromstring(response.content)

        items = root.findall('./channel/item')
        articles = []

        for item in items[:5]:
            news_title = item.find('title').text
            link = item.find('link').text
            pubDate = item.find('pubDate').text
            source = item.find('source')
            source_text = source.text if source is not None else 'Unknown'

            articles.append({
                "title": news_title,
                "link": link,
                "published": pubDate,
                "source": source_text
            })

        return {
            "topic": title,
            "articles": articles if articles else [{"message": "No valid articles found today."}]
        }

    # Topics to fetch
    topics = {
        "Mutual Funds": "mutual+fund+India",
        "Recurring Deposits (RD)": "recurring+deposit+India",
        "Fixed Deposits (FD)": "fixed+deposit+India",
        "Gold Prices": "gold+price+India",
        "Financial News": "Financial+news+India"
    }

    # Collect all news
    all_news = []
    for title, keyword in topics.items():
        all_news.append(fetch_news(keyword, title))

    return all_news

