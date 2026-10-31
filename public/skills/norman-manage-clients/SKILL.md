---
name: norman-manage-clients
description: Manage business clients - list, search, create, or update client information. Use when the user mentions clients, contacts, customers, Kunden, or needs to manage their client database.
version: 1.0.0
metadata:
  openclaw:
    emoji: "\U0001F465"
    homepage: https://norman.finance
    requires:
      mcp:
        - norman-finance
  minis:
    originalSource: "https://clawskills.sh/skills/stanlee000-norman-manage-clients"
    convertedAt: "2026-10-31T22:12:53.111Z"
    license: "Unknown"
---

Help the user manage their client database:

## Listing and searching
- Call `list_clients` to show all clients
- Present results in a clean table format: Name, Email, Phone, Outstanding balance

## Creating a new client
When creating a client with `create_client`, gather:
- **Required**: Client name (company or individual)
- **Recommended**: Email, phone, address (street, city, postal code, country)
- **Optional**: Tax ID (Steuernummer), VAT ID (USt-IdNr.), payment terms, notes
- For German businesses: ask about Kleinunternehmer status if relevant

## Updating a client
- Call `get_client` first to show current details
- Call `update_client` with only the fields that need changing
- Confirm changes with the user before updating

## Best practices
- Always verify client details before creating invoices
- For EU clients, the VAT ID (USt-IdNr.) is important for reverse charge invoices
- Suggest cleaning up duplicate clients if detected
