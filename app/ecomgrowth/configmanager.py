import json
import os
import sys

config_file = 'ecomgrowth/config.json'

# configManager singleton
class ConfigManager:

    def __init__(self):
        pass

    def read_config(self):
        with open(config_file, 'r') as f:
            return json.load(f)

    def write_config(self, config):
        with open(config_file, 'w') as f:
            json.dump(config, f, indent=4)

    def update_config(self, key, value):
        config = self.read_config()
        config[key] = value
        self.write_config(config)

    def delete_key(self, key):
        config = self.read_config()
        if key in config:
            del config[key]
            self.write_config(config)