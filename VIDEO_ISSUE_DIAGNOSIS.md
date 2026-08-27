## Problem Analysis

Based on my examination of the codebase, I've identified why team member videos are not displaying in the frontend despite being saved in the CMS.

### Root Cause

There's a critical mismatch between:
1. **CMS Configuration** (in `public/admin/config.yml`): The team member fields are configured to use `youtubeId` field name
2. **Frontend Component** (`src/pages/TeamMember.tsx`): Expects a full video URL in the `video` field

### Technical Details

Looking at `public/admin/config.yml`, lines 207-213 show:
```
- label: Video
  name: video
  widget: string
  required: false
```

But this field is configured for YouTube videos and expects a `youtubeId` value, while the component looks for a full URL in the `video` field.

In `src/pages/TeamMember.tsx`, lines 97-115 show:
```tsx
{member.video && (
  <div className="mt-16">
    <h2 className="mb-5 text-3xl font-bold">Video</h2>
    <div className="aspect-video">
      <iframe
        className="h-full w-full rounded-2xl border border-white/10"
        src={
          member.video.includes("youtube.com/watch")
            ? member.video.replace("watch?v=", "embed/")
            : member.video.includes("youtu.be/")
              ? member.video.replace("youtu.be/", "youtube.com/embed/")
              : member.video
        }
        title={member.name}
        allowFullScreen
      />
    </div>
  </div>
)}
```

### The Issue

Looking at `src/data/content.json`, team members have a `video` field but the CMS configuration expects `youtubeId`. When content is saved through CMS, it's likely stored in the `youtubeId` field, but the frontend component looks for `video`.

### Solution

1. **Option 1**: Update the CMS configuration to use `video` field instead of `youtubeId`
2. **Option 2**: Modify the frontend component to look for `youtubeId` and construct the full URL
3. **Option 3**: Ensure that when videos are saved in CMS, they're properly formatted as full URLs

The most likely issue is that the `video` field in team member data entries in content.json is either:
- Missing completely
- Empty/undefined 
- Contains a YouTube ID instead of a full URL

### Recommended Fix

The component should be updated to handle both cases - looking for either `youtubeId` or `video` fields and constructing the proper URL accordingly.