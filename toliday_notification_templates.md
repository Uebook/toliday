# Toliday Notification Templates

This document contains the verified and formatted WhatsApp and SMS notification templates for the Toliday platform. They are categorized by their target audience: Partners (Vendors) and Guests.

---

## Variables Dictionary

The templates below use dynamic placeholders (e.g., `{{1}}`). Here is the key to what each variable represents:

| Variable | Description / Purpose |
| :--- | :--- |
| **`{{1}}`** | Name of the recipient (Partner, Guest, or Vendor) |
| **`{{2}}`** | Property Name, Service Name, or Partner Business Name |
| **`{{3}}`** | Booking ID / Reference Number |
| **`{{4}}`** | Check-in Date & Time |
| **`{{5}}`** | Check-out Date & Time |
| **`{{6}}`** | Room Type / Package Details |
| **`{{7}}`** | Amount (Total Amount, Amount Paid, etc.) |
| **`{{8}}`** | Support Contact Information (Phone/Email/Link) |
| **`{{9}}`** | OTP (One-Time Password) Code |
| **`{{10}}`**| Account Rejection Reason |
| **`{{11}}`**| Payment Transaction ID |
| **`{{12}}`**| Number of Guests |
| **`{{13}}`**| Property Location Address / Maps Link |

---

## 1. Partner / Vendor Templates

### 1.1. Partner Signup — Welcome Message
* **Trigger:** Immediately after successful signup by Hotel / Tour Partner / Bus / Cab Vendor
* **Template Name:** `toliday_partner_welcome`
* **Category:** UTILITY

**WhatsApp Template:**
> Welcome to Toliday, {{1}}!
> 
> Your account for *{{2}}* has been successfully created on the Toliday Extranet Portal.
> 
> We are currently reviewing your documents and business details. Our team will verify your account within *24–48 working hours*.
> 
> *What happens next?*
> 1. Our team reviews your submitted documents
> 2. You receive an approval notification
> 3. You can log in and start managing bookings
> 
> For any queries, reach us at:
> {{8}}
> 
> Team Toliday

**SMS Template:**
> Welcome to Toliday! Your account for {{2}} has been created. We are verifying your documents (24-48 hrs). For help: {{8}} - Team Toliday

### 1.2. Account Under Review
* **Trigger:** After signup, confirming that the account is in a PENDING state
* **Template Name:** `toliday_account_under_review`
* **Category:** UTILITY

**WhatsApp Template:**
> Hi {{1}},
> 
> Your Toliday partner account for *{{2}}* is currently under review.
> 
> Our compliance team is verifying:
> - GST / PAN Documents
> - Business Registration Details
> - Bank Account Information
> 
> You will receive a notification once your account is approved. This usually takes *24–48 working hours*.
> 
> Need help? Contact us at {{8}}.
> 
> — Team Toliday

**SMS Template:**
> Hi {{1}}, your Toliday account for {{2}} is under review. Verification takes 24-48 hrs. We'll notify you once approved. Help: {{8}}

### 1.3. Account Approved
* **Trigger:** When admin approves the partner account (status changes from PENDING → APPROVED)
* **Template Name:** `toliday_account_approved`
* **Category:** UTILITY

**WhatsApp Template:**
> Congratulations, {{1}}!
> 
> Your Toliday partner account for *{{2}}* has been *approved*!
> 
> You can now log in to your Extranet Portal and:
> - Manage your listings & inventory
> - Accept and track bookings
> - Monitor revenue & payouts
> - Access detailed analytics
> 
> Login at: https://extranet.toliday.com
> 
> For support: {{8}}
> 
> Welcome aboard! — Team Toliday

**SMS Template:**
> Congratulations {{1}}! Your Toliday account for {{2}} is APPROVED. Login at extranet.toliday.com to start managing bookings. Help: {{8}}

### 1.4. Account Rejected
* **Trigger:** When admin rejects the partner account
* **Template Name:** `toliday_account_rejected`
* **Category:** UTILITY

**WhatsApp Template:**
> Hi {{1}},
> 
> We regret to inform you that your Toliday partner registration for *{{2}}* could not be approved at this time.
> 
> *Reason:* {{10}}
> 
> *What you can do:*
> - Review and correct the mentioned issue
> - Re-submit your application with updated documents
> - Contact our support team for guidance
> 
> Support: {{8}}
> 
> We hope to welcome you soon. — Team Toliday

**SMS Template:**
> Hi {{1}}, your Toliday registration for {{2}} was not approved. Reason: {{10}}. Please contact {{8}} to resolve and re-apply.

### 1.5. New Booking Alert — Vendor/Hotel Side
* **Trigger:** When a guest makes a new booking (vendor receives alert)
* **Template Name:** `toliday_new_booking_alert`
* **Category:** UTILITY

**WhatsApp Template:**
> *New Booking Received!*
> 
> Hi {{1}}, you have a new booking at *{{2}}*!
> 
> *Booking Details:*
> Reference: *{{3}}*
> Guest: {{1}}
> Check-in: {{4}}
> Check-out: {{5}}
> Room/Package: {{6}}
> Guests: {{12}}
> Amount: ₹{{7}}
> 
> Please log in to your Extranet to manage this booking.
> https://extranet.toliday.com
> 
> — Team Toliday

**SMS Template:**
> New Booking! Ref: {{3}} | Guest: {{1}} | Check-in: {{4}} | Check-out: {{5}} | Amt: Rs.{{7}}. Login: extranet.toliday.com

### 1.6. Booking Cancellation — Vendor Side
* **Trigger:** When a booking is cancelled (alert sent to vendor)
* **Template Name:** `toliday_booking_cancelled_vendor` *(Note: Derived from the shared cancellation template)*
* **Category:** UTILITY

**WhatsApp Template:**
> *Booking Cancelled — {{3}}*
> 
> Hi {{1}}, a booking at *{{2}}* has been cancelled.
> 
> Check-in: {{4}}
> Check-out: {{5}}
> Amount: ₹{{7}}
> 
> Inventory has been automatically restored. Please log in to your Extranet for more details.
> 
> — Team Toliday

---

## 2. Guest Templates

### 2.1. Booking Confirmation — Guest Side
* **Trigger:** After a guest completes a booking (sent to guestContact)
* **Template Name:** `toliday_booking_confirmation`
* **Category:** UTILITY

**WhatsApp Template:**
> *Booking Confirmed!*
> 
> Dear {{1}},
> 
> Your booking has been *confirmed* with Toliday!
> 
> *Your Booking Details:*
> Booking ID: *{{3}}*
> Property: {{2}}
> Location: {{13}}
> Room/Package: {{6}}
> Check-in: {{4}}
> Check-out: {{5}}
> Guests: {{12}}
> Total Amount: ₹{{7}}
> 
> *Important:* Please carry a valid photo ID at the time of check-in.
> 
> For any changes or queries:
> {{8}}
> 
> Thank you for choosing Toliday!
> — Team Toliday

**SMS Template:**
> Booking Confirmed! ID: {{3}} | {{2}}, {{13}} | Check-in: {{4}} | Check-out: {{5}} | Amt: Rs.{{7}}. Carry valid ID. Help: {{8}} - Toliday

### 2.2. Payment Confirmation — Guest Side
* **Trigger:** After payment is successfully processed
* **Template Name:** `toliday_payment_confirmation`
* **Category:** UTILITY

**WhatsApp Template:**
> *Payment Successful!*
> 
> Dear {{1}},
> 
> We have received your payment for your Toliday booking.
> 
> *Payment Details:*
> Booking ID: *{{3}}*
> Amount Paid: *₹{{7}}*
> Transaction ID: {{11}}
> Property: {{2}}
> Check-in: {{4}}
> Check-out: {{5}}
> 
> Your booking is now fully confirmed. Save this message for your records.
> 
> For support:
> {{8}}
> 
> Happy travels! — Team Toliday

**SMS Template:**
> Payment of Rs.{{7}} received for Booking {{3}} at {{2}}. Txn ID: {{11}}. Check-in: {{4}}. Safe travels! - Toliday. Help: {{8}}

### 2.3. Booking Cancellation — Guest Side
* **Trigger:** When a booking is cancelled (alert sent to guest)
* **Template Name:** `toliday_booking_cancelled`
* **Category:** UTILITY

**WhatsApp Template:**
> *Booking Cancelled*
> 
> Dear {{1}},
> 
> Your booking *{{3}}* at *{{2}}* has been cancelled.
> 
> Check-in: {{4}}
> Check-out: {{5}}
> Amount: ₹{{7}}
> 
> If a refund is applicable, it will be processed within *5–7 working days* to your original payment method.
> 
> For assistance:
> {{8}}
> 
> We hope to serve you again soon. — Team Toliday

**SMS Template:**
> Booking {{3}} at {{2}} has been cancelled. Refund (if applicable) in 5-7 days. For help: {{8}} - Toliday

### 2.4. Check-in Reminder — Guest
* **Trigger:** 24 hours before check-in date
* **Template Name:** `toliday_checkin_reminder`
* **Category:** UTILITY

**WhatsApp Template:**
> *Check-in Reminder!*
> 
> Dear {{1}},
> 
> Your stay at *{{2}}* begins *tomorrow*!
> 
> *Quick Summary:*
> Booking ID: {{3}}
> Location: {{13}}
> Check-in: {{4}}
> Room: {{6}}
> 
> Reminders:
> - Carry a valid government-issued photo ID
> - Check-in time is typically 2:00 PM (confirm with property)
> - Keep your Booking ID handy
> 
> Enjoy your stay!
> 
> For help: {{8}}
> — Team Toliday

**SMS Template:**
> Reminder: Check-in tomorrow at {{2}}, {{13}}. Booking ID: {{3}}. Carry valid ID. Enjoy your stay! Help: {{8}} - Toliday

### 2.5. Check-out Reminder — Guest
* **Trigger:** Morning of check-out date
* **Template Name:** `toliday_checkout_reminder`
* **Category:** UTILITY

**WhatsApp Template:**
> *Check-out Reminder*
> 
> Dear {{1}},
> 
> Your check-out at *{{2}}* is *today*.
> 
> Check-out Date: {{5}}
> Booking ID: {{3}}
> 
> Standard check-out time is 11:00 AM. Please coordinate with the property for any late check-out requests.
> 
> We hope you had a wonderful experience! We'd love your feedback.
> 
> For support: {{8}}
> 
> Thank you for choosing Toliday! — Team Toliday

**SMS Template:**
> Check-out today from {{2}}. Booking ID: {{3}}. Standard time: 11 AM. Hope you had a great stay! Rate us on Toliday. - Team Toliday

---

## 3. General / Authentication Templates

### 3.1. OTP / Verification
* **Trigger:** When staff/guest requests OTP for login or verification
* **Template Name:** `toliday_otp_verification`
* **Category:** AUTHENTICATION

**WhatsApp Template:**
> *Toliday Verification Code*
> 
> Your OTP is: *{{9}}*
> 
> This code is valid for *10 minutes*. Do not share it with anyone.
> 
> If you did not request this, please contact us at {{8}}.
> 
> — Team Toliday

**SMS Template:**
> Your Toliday OTP is: {{9}}. Valid for 10 minutes. Do NOT share with anyone. - Team Toliday
