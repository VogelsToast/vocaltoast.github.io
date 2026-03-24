---
title: "Why Measuring Influencer Marketing ROI Is Still Broken"
description: "The industry tracks reach, impressions, and affiliate codes. But the way creator marketing actually drives revenue looks nothing like what your dashboard shows."
pubDate: "2026-03-22"
tags: ["Influencer Marketing", "Marketing Measurement", "Creator Marketing"]
---

I've spent the last few years working across both sides of creator marketing. At Poliigon, I worked for the influencer, helping BlenderGuru's brand figure out what content actually moved the needle for the business. At Narrative, I built and led the marketing team that ran the creator and ambassador programme, trying to understand which partnerships were worth investing in and which were just burning budget. Both experiences taught me the same thing: the way most companies measure influencer marketing ROI is completely disconnected from how creator influence actually works.

And the frustrating part is that the industry knows this. Ask any marketing director if they're confident in their influencer attribution and you'll get a long pause followed by something like "we're working on it." Everyone can feel that the numbers they're looking at don't tell the full story. But most teams keep tracking the same metrics because they don't have a better option.

## The metrics everyone tracks (that don't tell you much)

Reach. Impressions. Engagement rate. These are the metrics that end up in every influencer campaign report, and they're the ones that tell you the least about actual business impact.

Reach tells you how many people theoretically saw a piece of content. It doesn't tell you if any of those people were your target customer. It doesn't tell you if they paid attention. And it definitely doesn't tell you if they did anything afterwards. But it's a big number, so it ends up on the slide deck.

Engagement rate is slightly more useful because at least it implies someone interacted with the content. But a like on Instagram isn't intent. A comment saying "cool!" isn't a signal that someone is about to sign up for your product. And engagement varies wildly by creator, platform, content format, and time of day. Comparing engagement rates across creators is comparing apples to furniture.

The metric most companies default to when they want something more concrete is affiliate code redemptions. And affiliate codes do capture a real signal. Someone typed in a code, which means they almost certainly came from that creator. But here's what affiliate tracking misses: at Narrative, we'd hear from customers all the time who had no idea there was a discount code available. They saw a creator use the product, they went and checked it out on their own, they signed up for a free trial. The creator drove that conversion, but the affiliate code got zero credit.

If you're only tracking affiliate codes, you're measuring the portion of influence that happens to flow through one specific mechanism. You're missing everything else.

## What the actual journey looks like

Here's what actually happens when a creator talks about your product, at least in the B2B and prosumer SaaS world I've worked in.

Someone sees a creator they trust using or talking about a tool. Maybe it's a YouTube video, maybe it's a passing mention in a tutorial, maybe it's a post on Instagram. That person doesn't immediately click a link and sign up. That's not how it works.

What they might do is mention it to their network. We'd see this constantly in photography community groups. Someone would post "I saw this product, has anyone tried it? What do you think?" Now the influence has spread to people who never saw the original creator content. Those people might go check out your website. They might read a few pages, watch a demo, look at pricing. They might come back a week later when they're actually ready to try something new.

At some point, they sign up for a free trial. They may or may not come through an affiliate link. They probably don't remember or know about a discount code. And your analytics dashboard attributes this conversion to "direct" or "organic search" because the last thing they did was Google your brand name and click through.

The creator did 80% of the work. Your attribution model gave them 0% of the credit.

![What actually happened vs what your dashboard shows](/blog-images/attribution-reality-gap.svg)

## Why HDYHAU changes everything

At Narrative, the single most valuable thing we did for measurement was adding a HDYHAU field (How Did You Hear About Us) to our signup flow. It's a simple self-reported question. And it completely changed our understanding of what was driving growth.

Without HDYHAU, we would have looked at our analytics and concluded that organic search and direct traffic were our strongest channels. With HDYHAU, we could see that a huge portion of those signups were actually driven by creators, events, word of mouth, and community. The channels that are hardest to track with traditional attribution were doing the most work.

HDYHAU isn't perfect. People don't always remember exactly where they first heard about you. They might say "YouTube" without naming the specific creator. They might say "a friend told me" when the friend's recommendation was triggered by seeing a creator's content. But directionally, it's far more accurate than any analytics-based attribution model for understanding creator impact.

We used HDYHAU not just at the individual level but to assess the programme as a whole. When we launched a batch of creator content in a given month, we'd watch for a lift in traffic and signups, and then cross-reference that against what was showing up in HDYHAU responses. We'd also track CAC per channel grouping and overall CAC month-on-month to get a sense of whether things were trending in the right direction.

## Smaller creators, bigger impact

One of the most counterintuitive things we learned at Narrative was that bigger creators didn't necessarily drive more conversions. In fact, on the whole, smaller creators were more impactful.

The logic makes sense when you think about it. A massive creator with a million followers has a broad audience. Most of those followers aren't your target customer. A smaller creator with 20,000 highly engaged followers who are all professional photographers? That's a direct pipeline to exactly the people you want to reach. The reach number is smaller, but the relevance is off the charts.

This is one of the reasons reach-based metrics are so misleading. If you're comparing creators by reach or impressions, you'll consistently overvalue the big names and undervalue the niche creators who are actually driving your best customers.

## The first-time creator trap

There's another pattern we noticed that I think a lot of companies get wrong. When a creator partners with you for the first time, that initial piece of content almost always drives the most conversions. It makes sense. Their audience is hearing about your product for the first time. There's novelty, there's curiosity, there's a spike.

After that first collaboration, the conversion numbers drop. And this is where a lot of companies make a mistake. They look at the declining affiliate numbers and conclude that the creator "isn't working anymore." They move on to the next creator, chase that first-time spike again, and end up on a treadmill of constantly cycling through new partnerships.

What they're missing is that a creator's value extends well beyond direct conversions. A creator who actually uses and loves your product becomes part of your brand ecosystem. They provide social proof. They create content that lives on YouTube or Instagram for years. They mention you in contexts that aren't tracked by any affiliate code. They build the ambient awareness and trust that makes everything else in your marketing work better.

You need to assess whether a creator is right for your brand over the long haul, not just whether their second video converted as well as their first.

![The first-time creator trap: affiliate conversions drop but total ecosystem value keeps growing](/blog-images/creator-value-over-time.svg)

## When content goes viral, pay attention

Something we did at Narrative that I'd recommend to anyone: when a creator's content performs exceptionally well organically, turn it into a paid ad. We'd take the best-performing creator content and boost it, then compare the CPA against our best-performing ads. More often than not, the creator content outperformed our in-house creative because it felt native and authentic rather than like an ad.

This is another measurement angle that most companies ignore. The value of creator content isn't just in the organic reach. It's in the creative asset itself. If you're only measuring the organic performance of a creator post, you're ignoring the potential value of that content as a paid asset.

## The spreadsheet problem

Even if you're doing all of this, tracking HDYHAU, monitoring CAC by channel, comparing creator content as paid creative, you're still stuck with a measurement process that involves a lot of spreadsheets and manual work. At Narrative, understanding the true impact of our creator programme meant pulling data from our database, Stripe, Meta Ads, GA4, and our HDYHAU responses, and then trying to stitch it all together in a spreadsheet.

It works. We made it work. But it's slow, it's manual, and it means you're always looking at lagging data rather than making real-time decisions. The insights are there if you dig for them, but the digging takes time that most marketing teams don't have.

This is a problem I'm actively working on solving right now. More on that soon.

## What I'd actually measure

If I were starting a creator programme tomorrow and had to pick what to track, here's where I'd focus.

First, set up HDYHAU tracking on your signup flow from day one. Don't wait. Even a simple text field gives you more signal than any amount of analytics configuration.

Second, track CAC at the channel level and overall. You want to see both whether individual channels are efficient and whether the total blended CAC is trending in the right direction as you invest more in creator partnerships.

Third, stop comparing creators purely on reach or even on affiliate code redemptions. Look at the quality of leads coming through. Are the customers who come via creator content retaining better? Do they have higher LTV? That matters far more than volume.

Fourth, pay attention to the qualitative signals. Are people mentioning your product in community groups unprompted? Are creators talking about you even when they're not being paid to? Is your brand showing up in conversations you didn't initiate? These are the signals that traditional measurement misses entirely, and they're often the strongest indicators that your ecosystem is working.

The measurement tooling for creator marketing hasn't caught up with the reality of how creator influence works. Most tools still operate on the assumption that influence is a direct, trackable, linear path from content to conversion. It isn't. And until the measurement catches up, the companies that invest in understanding the full picture, even imperfectly, will have a significant edge over the ones that are still staring at affiliate dashboards wondering why the numbers don't add up.
