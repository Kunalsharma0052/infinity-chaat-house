import { data } from "@/assests/data";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import logo from "@/logo/ith-logo.png";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Header = () => {
  const router = useRouter();
  const [isScrolling, setIsScrolling] = useState(false);
  const changePath = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        setIsScrolling(currentScroll > 0);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);
  return (
    <Box
      sx={{
        position: isScrolling ? "fixed" : "absolute",
        top: 0,
        left: 0,
        width: isScrolling ? "100%" : "100%",
        zIndex: 99,
        backgroundColor: isScrolling ? "#00000050" : COLORS.TRANSPARENT,
        transition: "all 0.5s ease",
        backdropFilter: isScrolling ? "blur(5px)" : "none",
      }}
    >
      <Container sx={{ p: 0.5 }}>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Link href="/">
            <Image src={logo} alt="" width={80} />
          </Link>
          <Stack direction={"row"} alignItems={"center"} spacing={4}>
            {data.headerLinks.map((val, i) => (
              <Typography
                sx={{
                  fontSize: 16,
                  fontFamily: roboto.style,
                  fontWeight: 400,
                  position: "relative",
                  cursor: "pointer",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: -2,
                    height: "2px",
                    backgroundColor: COLORS.PRIMARY,

                    transform: "scaleX(0)",
                    transition: "transform 0.3s ease",
                    transformOrigin: "left",
                  },
                  "&:hover::after": {
                    transform: "scaleX(1)",
                  },
                  color: isScrolling ? COLORS.WHITE : COLORS.WHITE,
                }}
                key={i}
                onClick={() => changePath(val.url)}
              >
                {val.label}{" "}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header;
