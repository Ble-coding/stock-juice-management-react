import React from 'react';
import { Link } from 'react-router-dom';

function SidebarMenu() {
  return (
    <div className="nk-sidebar nk-sidebar-fixed is-dark " data-content="sidebarMenu">
        <div className="nk-sidebar-element nk-sidebar-head">
            <div className="nk-menu-trigger">
                <a href="#" className="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu"><em className="icon ni ni-arrow-left"></em></a>
                <a href="#" className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex" data-target="sidebarMenu"><em className="icon ni ni-menu"></em></a>
            </div>
            <div className="nk-sidebar-brand">
                <a href="html/index.html" className="logo-link nk-sidebar-logo">
                    <img className="logo-light logo-img" src="./images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo" />
                    <img className="logo-dark logo-img" src="./images/logo-dark.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark" />
                </a>
            </div>
        </div>
        <div className="nk-sidebar-element nk-sidebar-body">
            <div className="nk-sidebar-content">
                <div className="nk-sidebar-menu" data-simplebar>
                    <ul className="nk-menu">
                        <li className="nk-menu-heading">
                            <h6 className="overline-title text-primary-alt">Use-Case Preview</h6>
                        </li>
                        <li className="nk-menu-item">
                            <a href="html/crm/index.html" className="nk-menu-link">
                                <span className="nk-menu-icon"><em className="icon ni ni-user-list"></em></span>
                                <span className="nk-menu-text">CRM Panel</span><span className="nk-menu-badge">HOT</span>
                            </a>
                        </li>
                        <li className="nk-menu-item">
                            <a href="html/hotel/index.html" className="nk-menu-link">
                                <span className="nk-menu-icon"><em className="icon ni ni-building"></em></span>
                                <span className="nk-menu-text">Hotel Management</span><span className="nk-menu-badge">HOT</span>
                            </a>
                        </li>
                        <li className="nk-menu-heading">
                            <h6 className="overline-title text-primary-alt">Dashboards</h6>
                        </li>
                        <li className="nk-menu-item">
                            <a href="html/index.html" className="nk-menu-link">
                                <span className="nk-menu-icon"><em className="icon ni ni-dashlite"></em></span>
                                <span className="nk-menu-text">Default Dashboard</span>
                            </a>
                        </li>
                        <li className="nk-menu-item">
                            <a href="html/index-crypto.html" className="nk-menu-link">
                                <span className="nk-menu-icon"><em className="icon ni ni-bitcoin-cash"></em></span>
                                <span className="nk-menu-text">Crypto Dashboard</span>
                            </a>
                        </li>
                        <li className="nk-menu-item">
                            <a href="html/index-analytics.html" className="nk-menu-link">
                                <span className="nk-menu-icon"><em className="icon ni ni-growth"></em></span>
                                <span className="nk-menu-text">Analytics Dashboard</span>
                            </a>
                        </li>
                        <li className="nk-menu-item">
                            <a href="html/index-invest.html" className="nk-menu-link">
                                <span className="nk-menu-icon"><em className="icon ni ni-coins"></em></span>
                                <span className="nk-menu-text">Invest Dashboard</span>
                            </a>
                        </li>
                        <li className="nk-menu-heading">
                            <h6 className="overline-title text-primary-alt">Pre-Built Pages</h6>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-tile-thumb"></em></span>
                                <span className="nk-menu-text">Projects</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <a href="html/project-card.html" className="nk-menu-link"><span className="nk-menu-text">Project Cards</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/project-list.html" className="nk-menu-link"><span className="nk-menu-text">Project List</span></a>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-users"></em></span>
                                <span className="nk-menu-text">User Manage</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <a href="html/user-list-regular.html" className="nk-menu-link"><span className="nk-menu-text">User List - Regular</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/user-list-compact.html" className="nk-menu-link"><span className="nk-menu-text">User List - Compact</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/user-details-regular.html" className="nk-menu-link"><span className="nk-menu-text">User Details - Regular</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/user-profile-regular.html" className="nk-menu-link"><span className="nk-menu-text">User Profile - Regular</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/user-card.html" className="nk-menu-link"><span className="nk-menu-text">User Contact - Card</span></a>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-user-list"></em></span>
                                <span className="nk-menu-text">Clients</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <Link to="customers" className="nk-menu-link"><span className="nk-menu-text">Liste</span></Link>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/customer-details.html" className="nk-menu-link"><span className="nk-menu-text">Details</span></a>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-file-docs"></em></span>
                                <span className="nk-menu-text">Stocks</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <Link to="stocks" className="nk-menu-link"><span className="nk-menu-text">Données</span></Link>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/customer-details.html" className="nk-menu-link"><span className="nk-menu-text">KYC Details - Regular</span></a>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-tranx"></em></span>
                                <span className="nk-menu-text">Transactions</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <a href="html/transaction-basic.html" className="nk-menu-link"><span className="nk-menu-text">Tranx List - Basic</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/transaction-crypto.html" className="nk-menu-link"><span className="nk-menu-text">Tranx List - Crypto</span></a>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-grid-alt"></em></span>
                                <span className="nk-menu-text">Applications</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <a href="html/apps-messages.html" className="nk-menu-link"><span className="nk-menu-text">Messages</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/apps-inbox.html" className="nk-menu-link"><span className="nk-menu-text">Inbox / Mail</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/apps-file-manager.html" className="nk-menu-link"><span className="nk-menu-text">File Manager</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/apps-chats.html" className="nk-menu-link"><span className="nk-menu-text">Chats / Messenger</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/apps-calendar.html" className="nk-menu-link"><span className="nk-menu-text">Calendar</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/apps-kanban.html" className="nk-menu-link"><span className="nk-menu-text">Kanban Board</span></a>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-file-docs"></em></span>
                                <span className="nk-menu-text">Invoice</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <a href="html/invoice-list.html" className="nk-menu-link"><span className="nk-menu-text">Invoice List</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/invoice-details.html" className="nk-menu-link"><span className="nk-menu-text">Invoice Details</span></a>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-card-view"></em></span>
                                <span className="nk-menu-text">Products</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <a href="html/product-list.html" className="nk-menu-link"><span className="nk-menu-text">Product List</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/product-card.html" className="nk-menu-link"><span className="nk-menu-text">Product Card</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/product-details.html" className="nk-menu-link"><span className="nk-menu-text">Product Details</span></a>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-item">
                            <a href="html/pricing-table.html" className="nk-menu-link">
                                <span className="nk-menu-icon"><em className="icon ni ni-view-col"></em></span>
                                <span className="nk-menu-text">Pricing Table</span>
                            </a>
                        </li>
                        <li className="nk-menu-item">
                            <a href="html/gallery.html" className="nk-menu-link">
                                <span className="nk-menu-icon"><em className="icon ni ni-img"></em></span>
                                <span className="nk-menu-text">Image Gallery</span>
                            </a>
                        </li>
                        <li className="nk-menu-heading">
                            <h6 className="overline-title text-primary-alt">Misc Pages</h6>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-signin"></em></span>
                                <span className="nk-menu-text">Auth Pages</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <a href="html/pages/auths/auth-login.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Login / Signin</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/pages/auths/auth-register.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Register / Signup</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/pages/auths/auth-reset.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Forgot Password</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/pages/auths/auth-success.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Success / Confirm</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="#" className="nk-menu-link nk-menu-toggle"><span className="nk-menu-text">classNameic Version - v2</span></a>
                                    <ul className="nk-menu-sub">
                                        <li className="nk-menu-item">
                                            <a href="html/pages/auths/auth-login-v2.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Login / Signin</span></a>
                                        </li>
                                        <li className="nk-menu-item">
                                            <a href="html/pages/auths/auth-register-v2.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Register / Signup</span></a>
                                        </li>
                                        <li className="nk-menu-item">
                                            <a href="html/pages/auths/auth-reset-v2.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Forgot Password</span></a>
                                        </li>
                                        <li className="nk-menu-item">
                                            <a href="html/pages/auths/auth-success-v2.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Success / Confirm</span></a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="#" className="nk-menu-link nk-menu-toggle"><span className="nk-menu-text">No Slider Version - v3</span></a>
                                    <ul className="nk-menu-sub">
                                        <li className="nk-menu-item">
                                            <a href="html/pages/auths/auth-login-v3.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Login / Signin</span></a>
                                        </li>
                                        <li className="nk-menu-item">
                                            <a href="html/pages/auths/auth-register-v3.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Register / Signup</span></a>
                                        </li>
                                        <li className="nk-menu-item">
                                            <a href="html/pages/auths/auth-reset-v3.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Forgot Password</span></a>
                                        </li>
                                        <li className="nk-menu-item">
                                            <a href="html/pages/auths/auth-success-v3.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Success / Confirm</span></a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-files"></em></span>
                                <span className="nk-menu-text">Error Pages</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <a href="html/pages/errors/404-classNameic.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">404 classNameic</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/pages/errors/504-classNameic.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">504 classNameic</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/pages/errors/404-s1.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">404 Modern</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/pages/errors/504-s1.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">504 Modern</span></a>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-files"></em></span>
                                <span className="nk-menu-text">Other Pages</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <a href="html/_blank.html" className="nk-menu-link"><span className="nk-menu-text">Blank / Startup</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/pages/faqs.html" className="nk-menu-link"><span className="nk-menu-text">Faqs / Help</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/pages/terms-policy.html" className="nk-menu-link"><span className="nk-menu-text">Terms / Policy</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/pages/regular-v1.html" className="nk-menu-link"><span className="nk-menu-text">Regular Page - v1</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/pages/regular-v2.html" className="nk-menu-link"><span className="nk-menu-text">Regular Page - v2</span></a>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-heading">
                            <h6 className="overline-title text-primary-alt">Components</h6>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-layers"></em></span>
                                <span className="nk-menu-text">Ui Elements</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/alerts.html" className="nk-menu-link"><span className="nk-menu-text">Alerts</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/accordions.html" className="nk-menu-link"><span className="nk-menu-text">Accordions</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/avatar.html" className="nk-menu-link"><span className="nk-menu-text">Avatar</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/badges.html" className="nk-menu-link"><span className="nk-menu-text">Badges</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/buttons.html" className="nk-menu-link"><span className="nk-menu-text">Buttons</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/buttons-group.html" className="nk-menu-link"><span className="nk-menu-text">Button Group</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/breadcrumb.html" className="nk-menu-link"><span className="nk-menu-text">Breadcrumb</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/cards.html" className="nk-menu-link"><span className="nk-menu-text">Cards</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/carousel.html" className="nk-menu-link"><span className="nk-menu-text">Carousel</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/list-dropdown.html" className="nk-menu-link"><span className="nk-menu-text">List Dropdown</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/modals.html" className="nk-menu-link"><span className="nk-menu-text">Modals</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/pagination.html" className="nk-menu-link"><span className="nk-menu-text">Pagination</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/popover.html" className="nk-menu-link"><span className="nk-menu-text">Popovers</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/progress.html" className="nk-menu-link"><span className="nk-menu-text">Progress</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/preloader.html" className="nk-menu-link"><span className="nk-menu-text">Preloader</span> <span className="nk-menu-badge">New</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/placeholders.html" className="nk-menu-link"><span className="nk-menu-text">Placeholders</span> <span className="nk-menu-badge">New</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/spinner.html" className="nk-menu-link"><span className="nk-menu-text">Spinner</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/tabs.html" className="nk-menu-link"><span className="nk-menu-text">Tabs</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/toast.html" className="nk-menu-link"><span className="nk-menu-text">Toasts</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/tooltip.html" className="nk-menu-link"><span className="nk-menu-text">Tooltip</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/elements/typography.html" className="nk-menu-link"><span className="nk-menu-text">Typography</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="#" className="nk-menu-link nk-menu-toggle"><span className="nk-menu-text">Utilities</span></a>
                                    <ul className="nk-menu-sub">
                                        <li className="nk-menu-item"><a href="html/components/elements/util-border.html" className="nk-menu-link"><span className="nk-menu-text">Border</span></a></li>
                                        <li className="nk-menu-item"><a href="html/components/elements/util-colors.html" className="nk-menu-link"><span className="nk-menu-text">Colors</span></a></li>
                                        <li className="nk-menu-item"><a href="html/components/elements/util-display.html" className="nk-menu-link"><span className="nk-menu-text">Display</span></a></li>
                                        <li className="nk-menu-item"><a href="html/components/elements/util-embeded.html" className="nk-menu-link"><span className="nk-menu-text">Embeded</span></a></li>
                                        <li className="nk-menu-item"><a href="html/components/elements/util-flex.html" className="nk-menu-link"><span className="nk-menu-text">Flex</span></a></li>
                                        <li className="nk-menu-item"><a href="html/components/elements/util-text.html" className="nk-menu-link"><span className="nk-menu-text">Text</span></a></li>
                                        <li className="nk-menu-item"><a href="html/components/elements/util-sizing.html" className="nk-menu-link"><span className="nk-menu-text">Sizing</span></a></li>
                                        <li className="nk-menu-item"><a href="html/components/elements/util-spacing.html" className="nk-menu-link"><span className="nk-menu-text">Spacing</span></a></li>
                                        <li className="nk-menu-item"><a href="html/components/elements/util-others.html" className="nk-menu-link"><span className="nk-menu-text">Others</span></a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-dot-box"></em></span>
                                <span className="nk-menu-text">Crafted Icons</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <a href="html/components/misc/svg-icons.html" className="nk-menu-link">
                                        <span className="nk-menu-text">SVG Icon - Exclusive</span>
                                    </a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/misc/nioicon.html" className="nk-menu-link">
                                        <span className="nk-menu-text">Nioicon - HandCrafted</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-item">
                            <a href="html/components/misc/icons.html" className="nk-menu-link">
                                <span className="nk-menu-icon"><em className="icon ni ni-menu-circled"></em></span>
                                <span className="nk-menu-text">Icon Libraries</span>
                            </a>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-table-view"></em></span>
                                <span className="nk-menu-text">Tables</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <a href="html/components/tables/table-basic.html" className="nk-menu-link"><span className="nk-menu-text">Basic Tables</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/tables/table-special.html" className="nk-menu-link"><span className="nk-menu-text">Special Tables</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/tables/table-datatable.html" className="nk-menu-link"><span className="nk-menu-text">DataTables</span></a>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-card-view"></em></span>
                                <span className="nk-menu-text">Forms</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <a href="html/components/forms/form-elements.html" className="nk-menu-link"><span className="nk-menu-text">Form Elements</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/forms/checkbox-radio.html" className="nk-menu-link"><span className="nk-menu-text">Checkbox Radio</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/forms/advanced-controls.html" className="nk-menu-link"><span className="nk-menu-text">Advanced Controls</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/forms/input-group.html" className="nk-menu-link"><span className="nk-menu-text">Input Group</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/forms/form-upload.html" className="nk-menu-link"><span className="nk-menu-text">Form Upload</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/forms/datetime-picker.html" className="nk-menu-link"><span className="nk-menu-text">Date &amp; Time Picker</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/forms/number-spinner.html" className="nk-menu-link"><span className="nk-menu-text">Number Spinner</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/forms/nouislider.html" className="nk-menu-link"><span className="nk-menu-text">noUiSlider</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/forms/form-layouts.html" className="nk-menu-link"><span className="nk-menu-text">Form Layouts</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/forms/form-validation.html" className="nk-menu-link"><span className="nk-menu-text">Form Validation</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="#" className="nk-menu-link nk-menu-toggle"><span className="nk-menu-text">Wizard</span></a>
                                    <ul className="nk-menu-sub">
                                        <li className="nk-menu-item"><a href="html/components/forms/form-wizard.html" className="nk-menu-link"><span className="nk-menu-text">Basic Demo</span></a></li>
                                        <li className="nk-menu-item"><a href="html/components/forms/wizard/create-project.html" className="nk-menu-link"><span className="nk-menu-text">Create Project</span></a></li>
                                        <li className="nk-menu-item"><a href="html/components/forms/wizard/create-profile.html" className="nk-menu-link"><span className="nk-menu-text">Create Profile</span></a></li>
                                        <li className="nk-menu-item"><a href="html/components/forms/wizard/two-factor-auth.html" className="nk-menu-link"><span className="nk-menu-text">Two Factor Auth</span></a></li>
                                        <li className="nk-menu-item"><a target="_blank" href="html/components/forms/wizard/survey-v1.html" className="nk-menu-link"><span className="nk-menu-text">Survey</span></a></li>
                                        <li className="nk-menu-item"><a target="_blank" href="html/components/forms/wizard/survey-v2.html" className="nk-menu-link"><span className="nk-menu-text">Survey v2</span></a></li>
                                    </ul>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="#" className="nk-menu-link nk-menu-toggle"><span className="nk-menu-text">Rich Editor</span></a>
                                    <ul className="nk-menu-sub">
                                        <li className="nk-menu-item"><a href="html/components/forms/form-summernote.html" className="nk-menu-link"><span className="nk-menu-text">Summernote</span></a></li>
                                        <li className="nk-menu-item"><a href="html/components/forms/form-quill.html" className="nk-menu-link"><span className="nk-menu-text">Quill</span></a></li>
                                        <li className="nk-menu-item"><a href="html/components/forms/form-tinymce.html" className="nk-menu-link"><span className="nk-menu-text">Tinymce</span></a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-pie"></em></span>
                                <span className="nk-menu-text">Charts</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <a href="html/components/charts/chartjs.html" className="nk-menu-link"><span className="nk-menu-text">Chart JS</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/charts/knob.html" className="nk-menu-link"><span className="nk-menu-text">Knob JS</span></a>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-puzzle"></em></span>
                                <span className="nk-menu-text">Widgets</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <a href="html/components/widgets/cards.html" className="nk-menu-link"><span className="nk-menu-text">Card Widgets</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/widgets/charts.html" className="nk-menu-link"><span className="nk-menu-text">Chart Widgets</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/widgets/ratings.html" className="nk-menu-link"><span className="nk-menu-text">Ratings Widgets</span></a>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-item has-sub">
                            <a href="#" className="nk-menu-link nk-menu-toggle">
                                <span className="nk-menu-icon"><em className="icon ni ni-block-over"></em></span>
                                <span className="nk-menu-text">Miscellaneous</span>
                            </a>
                            <ul className="nk-menu-sub">
                                <li className="nk-menu-item">
                                    <a href="html/components/misc/slick-sliders.html" className="nk-menu-link"><span className="nk-menu-text">Slick Slider</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/misc/toastr.html" className="nk-menu-link"><span className="nk-menu-text">Toastr</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/misc/sweet-alert.html" className="nk-menu-link"><span className="nk-menu-text">Sweet Alert</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/misc/js-tree.html" className="nk-menu-link"><span className="nk-menu-text">jsTree</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/misc/dual-listbox.html" className="nk-menu-link"><span className="nk-menu-text">Dual Listbox</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/misc/dragula.html" className="nk-menu-link"><span className="nk-menu-text">Dragula</span></a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components/misc/map.html" className="nk-menu-link"><span className="nk-menu-text">Google Map</span></a>
                                </li>
                            </ul>
                        </li>
                        <li className="nk-menu-item">
                            <a href="html/email-templates.html" className="nk-menu-link">
                                <span className="nk-menu-icon"><em className="icon ni ni-text-rich"></em></span>
                                <span className="nk-menu-text">Email Template</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SidebarMenu;
