import { v4 as uuidv4 } from 'uuid';

const dataClassifiers = {
  'credit-card-number': 'card-number',
  'card-security-code': 'cvv',
  'card-expiration-date': 'expiry',
  'ssn': 'ssn',
  'password': 'password',
}


const getEntry = (endpoint, name, type) => {
  const tag = dataClassifiers[type];
  return {
    "classifiers": tag ? {"TAGS": tag} : {},
    "config": {
      "condition": "AND",
      "rules": [
          {
            "condition": null,
            "expression": {
                "field": "PathInfo",
                "operator": "equals",
                "type": "string",
                "values": [
                  endpoint
                ]
            }
          },
          {
            "condition": null,
            "expression": {
                "field": "ContentType",
                "operator": "equals",
                "type": "string",
                "values": [
                  "application/json;charset=UTF-8"
                ]
            }
          }
      ]
    },
    "id": uuidv4(),
    "id_selector": null,
    "operation": "REDACT",
    "operations": null,
    "phase": "REQUEST",
    "public_token_generator": "UUID",
    "targets": [
      "body"
    ],
    "token_manager": `${type === 'card-security-code' ? "VOLATILE" : "PERSISTENT"}`,
    "transformer": "JSON_PATH",
    "transformer_config": [
      `$.${name}`
    ],
    "transformer_config_map": null
  }
}


const getRouteConfig = (state) => {
  const id = uuidv4();
  return {
    "data": [
        {
          "attributes": {
              "created_at": new Date(new Date().getTime()).toISOString(),
              "destination_override_endpoint": "https://echo.apps.verygood.systems",
              "entries": state.form.map(field => getEntry(state.endpoint, field.name, field.type)),
              "host_endpoint": "(.*)\\.verygoodproxy\\.com",
              "id": id,
              "ordinal": null,
              "port": 80,
              "protocol": "http",
              "source_endpoint": "*",
              "tags": {
                "name": "echo.apps.verygood.systems-collect-form",
                "source": "RouteContainer"
              },
              "updated_at": new Date(new Date().getTime()).toISOString()
          },
          "id": id,
          "type": "rule_chain"
        }
    ],
    "version": 1
  }
};

export default getRouteConfig;
