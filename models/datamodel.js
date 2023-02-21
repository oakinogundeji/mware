'use strict';
/**
 * Module dependencies
 */
const Mongoose = require('mongoose');

/**
 * Define Schema
 */
const DataObjectSchema = new Mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
      },
      localCart: {
        lineItems: {
            type: Array,
            default: []
          },
        taxRate: {
            type: Number,
            default: 0.00
          },
        taxDescription: {
            type: String,
            default: ''
          },
        Tax: {
            type: String,
            default: ''
          },
        taxCalculated: {
            type: Boolean,
            default: false
          },
        subTotal: {
            type: Number,
            default: 0.00
          },
        shippingSurcharge: {
            type: Number,
            default: 0.00
          },
        shippingTotal: {
            type: Number,
            default: 0.00
          },
        taxTotal: {
            type: Number,
            default: 0.00
          },
        lineItemTotal: {
            type: Number,
            default: 0.00
          },
        discountType: {
            type: String,
            default: ''
          },
        discountValue: {
            type: Number,
            default: 0.00
          },
        discountTotal: {
            type: Number,
            default: 0.00
          },
        discountSubtotal: {
            type: Number,
            default: 0.00
          },
        discountFreeShipping: {
            type: Boolean,
            default: false
          },
        freeShippingMinimum: {
            type: Number,
            default: 0.00
          },
        total: {
            type: Number,
            default: 0.00
          },
        taxableAmount: {
            type: Number,
            default: 0.00
          }
      },
    locale: {
        type: String,
        default: "en-US"
        }, // String Users language preference
    cartCurrency: {
        type: String,
        default: "USD"
        }, // String Currency charged
    shippingZone: {
        type: String,
        default: "TR"
        }, // String IP location of user
    checkedOut: {
        type: Boolean,
        default: true
        }, // Boolean indicates whether user is checked out or not
    couponCode: {
        type: String,
        default: ""
        },
    authorized: {
        type: Boolean,
        default: false
        },
    sentToShopify: {
        type: Boolean,
        default: true
        }, // Boolean Indicates if this is a real transaction to be processed or not
    primaryVariantId: {
        type: String,
        default: ""
        }, // String Shopify variant ID of the main product
    checkoutPageName: {
        type: String,
        default: ""
        }, // String Indicates the checkout page's name
    checkoutPageParams: {
    utm_content: {
        type: String,
        default: ""
        }
    }, // Object Query parameters stored in an object
    auxPageName: {
        type: String,
        default: ""
        }, // String Indicates the product type sheets, comforter, towel, steamer, ...
    landingPageName: {
        type: String,
        default: ""
        }, // String Indicates the landing page's name
    funnelName: {
        type: String,
        default: ""
        }, // String Indicates funnel's name
    advertorialPageName: {
        type: String,
        default: ""
        }, // String Indicates the advertorial's name
    billingAddress: {
    zip: {
        type: String,
        default: "06401"
        },
    country: {
        type: String,
        default: "US"
        },
    province: {
        type: String,
        default: "CT"
        },
    address2: {
        type: String,
        default: "Aprt 2"
        },
    city: {
        type: String,
        default: "Fakeville"
        },
    phone: {
        type: String,
        default: "203-555-1212"
        },
    address1: {
        type: String,
        default: "123 Fake St"
        },
    last_name: {
        type: String,
        default: "Order"
        },
    first_name: {
        type: String,
        default: "Test"
        }
    },
    shippingAddress: {
        zip: {
            type: String,
            default: "06401"
            },
        country: {
            type: String,
            default: "US"
            },
        province: {
            type: String,
            default: "CT"
            },
        address2: {
            type: String,
            default: "Aprt 2"
            },
        city: {
            type: String,
            default: "Fakeville"
            },
        phone: {
            type: String,
            default: "203-555-1212"
            },
        address1: {
            type: String,
            default: "123 Fake St"
            },
        last_name: {
            type: String,
            default: "Order"
            },
        first_name: {
            type: String,
            default: "Test"
            }
        }
});

/**
 * Compile Schema to Model
 */
const DataObjectModel = Mongoose.model('DataObject', DataObjectSchema);

/**
 * Export DataObjectModel
 */
module.exports = DataObjectModel;