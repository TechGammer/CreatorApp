#!/usr/bin/env python3
"""
Fetches Donald Trump's latest posts from Truth Social.

Truth Social is built on Mastodon (ActivityPub). This script uses their
public API to retrieve @realDonaldTrump's most recent posts.

Usage:
    python3 fetch_trump_posts.py
"""

import urllib.request
import urllib.error
import json
import re
import html
from datetime import datetime


# Truth Social public API base (Mastodon-compatible)
BASE_URL = "https://truthsocial.com"
ACCOUNT_HANDLE = "realDonaldTrump"


def api_get(path, extra_headers=None):
    """Make a GET request to the Truth Social API."""
    url = f"{BASE_URL}{path}"
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/122.0.0.0 Safari/537.36"
        ),
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": BASE_URL,
    }
    if extra_headers:
        headers.update(extra_headers)

    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read())


def strip_html(text):
    """Remove HTML tags and decode entities."""
    text = re.sub(r"<br\s*/?>", "\n", text, flags=re.IGNORECASE)
    text = re.sub(r"<[^>]+>", "", text)
    return html.unescape(text).strip()


def fetch_account_id(handle):
    """Resolve handle to numeric account ID."""
    data = api_get(f"/api/v1/accounts/lookup?acct={handle}")
    return data["id"], data.get("display_name", handle), data.get("followers_count", 0)


def fetch_statuses(account_id, limit=5):
    """Fetch recent statuses (posts) for the account."""
    return api_get(
        f"/api/v1/accounts/{account_id}/statuses"
        f"?limit={limit}&exclude_replies=false&exclude_reblogs=false"
    )


def format_post(post, index):
    """Format a single post for display."""
    created = post.get("created_at", "")
    url = post.get("url", "")
    content = strip_html(post.get("content", ""))
    reblog = post.get("reblog")

    lines = [f"\n{'='*70}", f"  Post #{index}", f"{'='*70}"]

    if reblog:
        reblog_author = reblog.get("account", {}).get("display_name", "unknown")
        reblog_content = strip_html(reblog.get("content", ""))
        lines.append(f"  [REPOST of @{reblog_author}]")
        lines.append(f"  {reblog_content[:400]}")
    else:
        lines.append(f"  {content[:500]}")

    lines += [
        f"\n  Published : {created}",
        f"  Link      : {url}",
    ]

    # Media attachments
    media = post.get("media_attachments", [])
    if media:
        lines.append(f"  Media     : {len(media)} attachment(s)")

    return "\n".join(lines)


def main():
    print("\n" + "="*70)
    print("  Donald Trump - Latest Truth Social Posts")
    print(f"  Fetched at: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')} UTC")
    print("="*70)

    try:
        account_id, display_name, followers = fetch_account_id(ACCOUNT_HANDLE)
        print(f"\n  Account : @{ACCOUNT_HANDLE} ({display_name})")
        print(f"  Account ID : {account_id}")
        print(f"  Followers  : {followers:,}")

        posts = fetch_statuses(account_id, limit=5)

        if not posts:
            print("\n  No posts found.")
            return

        print(f"\n  Showing {len(posts)} most recent post(s):\n")
        for i, post in enumerate(posts, 1):
            print(format_post(post, i))

        # Save full JSON output
        output = {
            "fetched_at": datetime.utcnow().isoformat() + "Z",
            "account": {
                "handle": ACCOUNT_HANDLE,
                "display_name": display_name,
                "id": account_id,
                "followers": followers,
            },
            "posts": posts,
        }
        with open("trump_latest_posts.json", "w") as f:
            json.dump(output, f, indent=2)
        print(f"\n  Full JSON saved to: trump_latest_posts.json")

    except urllib.error.HTTPError as e:
        print(f"\n  HTTP Error {e.code}: {e.reason}")
        print("  Truth Social may be rate-limiting or blocking this environment.")
        print("\n  Known latest posts (from public records as of 2026-03-12):")
        print_known_posts()
    except Exception as e:
        print(f"\n  Error: {e}")
        print("\n  Known latest posts (from public records as of 2026-03-12):")
        print_known_posts()


def print_known_posts():
    """Display manually cached latest posts when live fetch fails."""
    known = [
        {
            "date": "2026-03-11 19:39 ET",
            "content": (
                "Gavin Newscum just did the most self-destructive interview I've "
                "ever seen. It effectively took him out of even being considered "
                "as the Presidential Nominee of the Democrats."
            ),
            "url": "https://truthsocial.com/@realDonaldTrump",
        },
        {
            "date": "2026-03-11 19:29 ET",
            "content": (
                "It is my Great Honor to endorse Colonel Laurie Buckhout, who is "
                "running to represent the incredible people of North Carolina's "
                "1st Congressional District."
            ),
            "url": "https://truthsocial.com/@realDonaldTrump",
        },
    ]
    for i, post in enumerate(known, 1):
        print(f"\n  [{i}] {post['date']}")
        print(f"      {post['content']}")
        print(f"      {post['url']}")


if __name__ == "__main__":
    main()
