import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_CREATE_RESET,
  LIST_MY_ORDERS_REQUEST,
  LIST_MY_ORDERS_SUCCESS,
  LIST_MY_ORDERS_FAIL,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAIL,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, order: { orderItems: [], shippingAddress: {} } },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const listMyOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case LIST_MY_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case LIST_MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case LIST_MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading_orders: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading_orders: false,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return {
        loading_orders: false,
        error_loading_orders: action.payload,
      };
    default:
      return state;
  }
};

export const updateOrderStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_STATUS_REQUEST:
      return {
        update_order_status_loading: true,
      };
    case UPDATE_ORDER_STATUS_SUCCESS:
      return {
        update_order_status_loading: false,
        update_order_status_success: true,
      };
    case UPDATE_ORDER_STATUS_FAIL:
      return {
        update_order_status_loading: false,
        update_order_status_error: action.payload,
      };
    default:
      return state;
  }
};
