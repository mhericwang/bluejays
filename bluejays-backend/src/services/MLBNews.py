import xml.etree.ElementTree as ET

import requests


class MLBNewsService:
    NAMESPACES = {
        "dc": "http://purl.org/dc/elements/1.1/",
        "content": "http://purl.org/rss/1.0/modules/content/",
        "atom": "http://www.w3.org/2005/Atom",
        "mlb": "https://www.mlb.com/rss/",
    }

    @staticmethod
    def get_rss_url(team_name=None):
        url = "https://www.mlb.com/feeds/news/rss.xml"
        if team_name is not None:
            url = f"https://www.mlb.com/{team_name}/feeds/news/rss.xml"
        return url

    @staticmethod
    def get_news(team_name=None):
        response = requests.get(MLBNewsService.get_rss_url(team_name))
        elements = ET.fromstring(response.content).find("channel").findall("item")
        news = []

        for e in elements:
            news.append(
                {
                    "title": e.findtext("title"),
                    "link": e.findtext("link"),
                    "author": e.findtext("dc:creator", namespaces=MLBNewsService.NAMESPACES),
                    "display_date": e.findtext("mlb:display-date", namespaces=MLBNewsService.NAMESPACES),
                    "image": e.find("image").attrib.get("href"),
                }
            )

        return news
