import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchNews } from "../api/api";

interface News {
  title: string;
  link: string;
  author: string;
  display_date: string;
  image: string;
}

interface NewsProps {
  teamName?: string;
  newsName?: string;
}

function News({ teamName, newsName }: NewsProps) {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await fetchNews(newsName);
        setNews(newsData);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };
    loadNews();
  }, [newsName]);
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 500, fontSize: 24 }}>
        {teamName ?? "MLB"} News
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          gap: 2,
          pb: 2,
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "4px",
          },
        }}
      >
        {news.map((item, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 280,
              maxWidth: 320,
              flexShrink: 0,
              cursor: "pointer",
              borderRadius: "4px",
              "&:hover": {
                boxShadow: 3,
              },
            }}
            onClick={() => window.open(item.link, "_blank")}
          >
            <CardMedia
              component="img"
              height="180"
              image={item.image}
              alt={item.title}
              sx={{ objectFit: "cover" }}
            />
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ mb: 1, fontSize: 16, fontWeight: 600 }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 14 }}
              >
                By {item.author ? item.author : "MLB"}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 14 }}
              >
                {item.display_date}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default News;
