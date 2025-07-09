# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-07-09
### Added
- Full file hashing using SHA-256 for better security
- Support for ES Modules (type: "module" in package.json)

### Changed
- Updated password generation to use full file hash instead of first 4KB
- Improved CLI performance with async file operations

### Fixed
- Fixed module imports for ES Modules compatibility
- Resolved file path resolution issues on different platforms

## [1.1.1] - 2025-07-08
### Added
- Show help menu when no arguments are provided
- Added `-v` shortcut for version flag
- Improved CLI usage documentation

### Fixed
- Fixed command-line argument parsing
- Better error handling for missing arguments

## [1.1.0] - 2025-07-08
### Added
- Support for any file type as input (not just MP4)
- Simplified CLI interface using only positional arguments
- Improved error handling and validation

## [1.0.5] - 2025-07-08
### Added
- Initial release with MP4 file support
- Basic command-line interface with options
- WebAssembly-based password generation
