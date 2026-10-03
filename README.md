# Internal IT Service Catalog

## Overview

This project is a client-side web application that simulates an internal corporate IT service portal. It is designed to demonstrate basic digital workflows and service request handling, specifically focusing on catalog items. The application provides an interface for employees to request work equipment, such as laptops or monitors, and software access.

## Core Features

### Dynamic Catalog Rendering

The catalog items (Hardware, Software, Access) are generated dynamically on the page using JavaScript, which iterates through a hardcoded array of objects.

### Service Request Management

Users can add desired items to a "My Service Request" block by clicking the "Request Item" button, and they also have the ability to remove items from this list.

### Real-time Budget Calculation

As items are added or removed, the application automatically calculates the total cost and displays it as the "Total Department Budget Impact".

### Mock Submission Workflow

Clicking the "Submit Request" button mimics an automated business process by clearing the request list and displaying a confirmation message:

"Request REQ00123 submitted successfully. Pending manager approval"

### No Backend Required

The entire logic and data storage are handled on the front end without the need for a database or server.

## Technologies Used

- HTML & CSS: For structuring and styling the internal portal interface.
- Vanilla JavaScript: For implementing the core logic, including arrays, loops, event handling, and DOM manipulation.

## Objective

This project was developed to showcase practical JavaScript skills within a corporate business domain, reflecting an understanding of internal IT support processes and catalog-based request systems.
