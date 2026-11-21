<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep short, pre-generated narration as CDN assets in a dedicated React audio player; playback must not trigger paid generation.
- Require user interaction to start narration and stop audio when its player unmounts, so visits stay silent and playback cannot leak across pages.
- Keep consent-gated Meta PageView ownership in CookieConsent: disable SDK automatic navigation, use trackSingle-only dispatch, and deduplicate by pathname so hash/query changes cannot create page views; queue the Pixel-scoped skipOpenbridge command before init to keep this site's events browser-only without changing the shared Gateway or other sites.
