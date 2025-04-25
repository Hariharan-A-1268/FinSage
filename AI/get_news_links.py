import requests
import xml.etree.ElementTree as ET

url = "https://news.google.com/rss/search?q=gold+price+India&hl=en-IN&gl=IN&ceid=IN:en"
response = requests.get(url)
root = ET.fromstring(response.content)

items = root.findall('./channel/item')
if not items:
    print({'message': 'No valid articles found today.'})
else:
    for i, item in enumerate(items[:5], start=1):
        title = item.find('title').text
        link = item.find('link').text
        pubDate = item.find('pubDate').text
        source = item.find('source')
        source_text = source.text if source is not None else 'Unknown'
        print(f"{i}. {title} ({source_text})")
        print(f"   Link: {link}")
        print(f"   Published: {pubDate}\n")
