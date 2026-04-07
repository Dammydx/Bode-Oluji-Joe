# EmailJS Setup Guide for Bode Oluji Joe Portfolio

This guide explains how to set up the contact, invite, and feedback forms if you change your email address or move to a new EmailJS account.

## 1. Environment Variables (.env)

Your project uses the following internal constants in the `.env` file to communicate with EmailJS. When setting up a new service, update these values:

```env
VITE_EMAILJS_SERVICE_ID=your_new_service_id
VITE_EMAILJS_PUBLIC_KEY=your_new_public_key

# Template IDs (specific to each form)
VITE_EMAILJS_INVITE_TEMPLATE_ID=your_invite_template_id
VITE_EMAILJS_FEEDBACK_TEMPLATE_ID=your_feedback_template_id
VITE_EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id
```

## 2. Template Configuration in EmailJS

For your forms to work correctly, your EmailJS templates must use the specific field names from the code. Use the following guide for each template:

### A. Request an Invite Template
- **Used in:** `InviteForm.tsx` & `Home.tsx` (Invite Modal)
- **Required Fields (use these in double brackets `{{field_name}}` in your template):**
    - `{{full_name}}`: Sender's name
    - `{{email}}`: Sender's email
    - `{{phone}}`: Phone/WhatsApp Number
    - `{{org}}`: Organization / Church
    - `{{event_type}}`: Type of event (e.g. Leadership Summit)
    - `{{topic}}`: Topic or Theme
    - `{{event_date}}`: Date of event
    - `{{event_time}}`: Time of event
    - `{{location}}`: Venue/Location
    - `{{duration}}`: Duration of the engagement
    - `{{budget}}`: Honorarium/Budget Range
    - `{{event_goal}}`: What they want to achieve
    - `{{welfare}}`: welfare/logistics
    - `{{notes}}`: Additional notes
    - `{{form_type}}`: System identifier ("Invite Request")

### B. Feedback Template
- **Used in:** `Feedback.tsx`
- **Required Fields:**
    - `{{full_name}}`: Sender's name
    - `{{email}}`: Sender's email
    - `{{event_name}}`: Event name/Church
    - `{{event_date}}`: Date of event
    - `{{rating}}`: Star rating (1-5)
    - `{{feedback}}`: Their full feedback message
    - `{{recommend}}`: "Yes" or "No" to recommendation
    - `{{form_type}}`: System identifier ("Feedback")

### C. Contact Me Template
- **Used in:** `Contact.tsx`
- **Required Fields:**
    - `{{name}}`: Sender's name
    - `{{email}}`: Sender's email
    - `{{message}}`: The full message
    - `{{form_type}}`: System identifier ("Contact Message")

## 3. How to Update or Switch
1. Go to [EmailJS.com](https://www.emailjs.com/) and create a new **Service** (e.g. connected to your Gmail).
2. Create three new **Templates** and copy-paste the fields above into the "Message" area of the templates.
3. Copy your new **Service ID**, **Public Key**, and the three **Template IDs**.
4. Update the `.env` file in your project folder with these new strings.
5. Restart your development server (`npm run dev`).

## 4. Anti-Spam Security
- Each form includes a "honeypot" field called `company_site`. If a bot fills this hidden field, the form will automatically block the submission. No configuration is needed for this.
