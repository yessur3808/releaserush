import { Box, Button, Link, Stack, Typography, useTheme } from "@mui/material";
import { ImageAsset, Source, TrailerLink } from "../../../lib/types";
import { coverAssetToUrl, sourceIcon } from "../helpers";
import { Cover } from "./Cover";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { getTrailerMeta, TrailerLinkWithCover } from "../utils";

export const GameLinks = ({
  trailers,
  coverUrl,
  sources,
  topSources,
  isMobile,
  t,
}: {
  trailers: TrailerLink[];
  coverUrl: string | null;
  sources: Source[];
  topSources: Source[];
  isMobile: boolean;
  t: (k: string, opts?: Record<string, unknown>) => string;
}) => {
  const theme = useTheme();

  if (trailers.length === 0 && topSources.length === 0) return null;

  return (
    <Box
      sx={{
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
        p: theme.spacing(4, 6),
      }}
    >
      <Stack spacing={2.25}>
        {trailers.length > 0 && (
          <Stack spacing={1}>
            <Typography variant="overline" color="text.secondary">
              {t("pages.game.trailers") ?? "Trailers"}
            </Typography>

            <Stack
              direction="row"
              spacing={1.25}
              flexWrap="wrap"
              useFlexGap
              sx={{ alignItems: "stretch" }}
            >
              {trailers.slice(0, 4).map((tr, idx) => {
                const meta = getTrailerMeta(
                  tr as TrailerLinkWithCover,
                  idx,
                  t,
                  coverUrl,
                );

                return (
                  <Box
                    key={`${meta.url}-${idx}`}
                    sx={{
                      width: { xs: "100%", sm: 220 },
                      borderRadius: 3,
                      border: `1px solid ${theme.palette.divider}`,
                      overflow: "hidden",
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.02)"
                          : "rgba(0,0,0,0.015)",
                    }}
                  >
                    {meta.thumbUrl ? (
                      <Cover
                        src={meta.thumbUrl}
                        alt={meta.label}
                        height={isMobile ? 140 : 120}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: isMobile ? 140 : 120,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background:
                            theme.palette.mode === "dark"
                              ? "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
                              : "linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.01))",
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {t("pages.game.no_cover") ?? "No cover available"}
                        </Typography>
                      </Box>
                    )}

                    <Box sx={{ p: 1 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        size="small"
                        href={meta.url}
                        target="_blank"
                        rel="noreferrer"
                        endIcon={<OpenInNewIcon fontSize="small" />}
                        sx={{ borderRadius: 2 }}
                      >
                        {meta.label}
                      </Button>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        )}

        {/* Sources */}
        {topSources.length > 0 && (
          <Stack spacing={1}>
            <Typography variant="overline" color="text.secondary">
              {t("pages.game.sources") ?? "Sources"}
            </Typography>

            <Stack spacing={1}>
              {topSources.map((s, idx) => (
                <Stack
                  key={`${s.url ?? s.name}-${idx}`}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    py: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.02)"
                        : "rgba(0,0,0,0.015)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "text.secondary",
                    }}
                  >
                    {sourceIcon(s)}
                  </Box>

                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
                      {s.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {(s.isOfficial ? "Official" : "Community/press") +
                        (s.type ? ` · ${s.type}` : "")}
                    </Typography>
                  </Box>

                  {s.url ? (
                    <Link
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      underline="none"
                      sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                      <Button
                        size="small"
                        variant="text"
                        endIcon={<OpenInNewIcon fontSize="small" />}
                        sx={{ borderRadius: 2 }}
                      >
                        {t("pages.game.open") ?? "Open"}
                      </Button>
                    </Link>
                  ) : null}
                </Stack>
              ))}
            </Stack>

            {sources.length > topSources.length ? (
              <Typography variant="caption" color="text.secondary">
                {t("pages.game.more_sources", {
                  count: sources.length - topSources.length,
                }) ?? `+${sources.length - topSources.length} more`}
              </Typography>
            ) : null}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
