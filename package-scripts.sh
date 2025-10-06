#!/bin/bash

# JWT Decoder & Encoder - Helper Scripts
# Make this file executable: chmod +x package-scripts.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Main menu
show_menu() {
    echo ""
    echo "=================================="
    echo "  JWT Tool - Helper Scripts"
    echo "=================================="
    echo ""
    echo "1) Install dependencies"
    echo "2) Start development server"
    echo "3) Run all checks (lint, type, test)"
    echo "4) Build for production"
    echo "5) Preview production build"
    echo "6) Generate test RSA keys"
    echo "7) Generate test ECDSA keys"
    echo "8) Deploy to Vercel"
    echo "9) Run tests with coverage"
    echo "0) Exit"
    echo ""
}

# Install dependencies
install_deps() {
    print_info "Installing dependencies..."
    npm install
    print_success "Dependencies installed!"
}

# Start dev server
start_dev() {
    print_info "Starting development server..."
    print_info "App will be available at http://localhost:5173"
    npm run dev
}

# Run checks
run_checks() {
    print_info "Running linter..."
    npm run lint
    print_success "Linting passed!"
    
    print_info "Running type check..."
    npm run type-check
    print_success "Type check passed!"
    
    print_info "Running tests..."
    npm test -- --run
    print_success "All tests passed!"
    
    print_success "All checks completed successfully!"
}

# Build production
build_prod() {
    print_info "Building for production..."
    npm run build
    print_success "Build completed! Output in dist/"
}

# Preview build
preview_build() {
    print_info "Starting preview server..."
    npm run preview
}

# Generate RSA keys
generate_rsa() {
    print_info "Generating RSA test keys..."
    
    if ! command -v openssl &> /dev/null; then
        print_error "OpenSSL not found. Please install OpenSSL first."
        return 1
    fi
    
    mkdir -p keys
    
    openssl genrsa -out keys/rsa-private.pem 2048 2>/dev/null
    openssl rsa -in keys/rsa-private.pem -pubout -out keys/rsa-public.pem 2>/dev/null
    
    print_success "RSA keys generated in keys/ directory"
    print_warning "⚠️  These are TEST keys only - never use in production!"
    ls -lah keys/rsa-*.pem
}

# Generate ECDSA keys
generate_ecdsa() {
    print_info "Generating ECDSA test keys..."
    
    if ! command -v openssl &> /dev/null; then
        print_error "OpenSSL not found. Please install OpenSSL first."
        return 1
    fi
    
    mkdir -p keys
    
    openssl ecparam -genkey -name prime256v1 -out keys/ec-private.pem 2>/dev/null
    openssl ec -in keys/ec-private.pem -pubout -out keys/ec-public.pem 2>/dev/null
    
    print_success "ECDSA keys generated in keys/ directory"
    print_warning "⚠️  These are TEST keys only - never use in production!"
    ls -lah keys/ec-*.pem
}

# Deploy to Vercel
deploy_vercel() {
    print_info "Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        print_error "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    vercel --prod
    print_success "Deployment initiated!"
}

# Run tests with coverage
run_coverage() {
    print_info "Running tests with coverage..."
    npm run test:coverage -- --run
    print_success "Coverage report generated!"
}

# Main loop
while true; do
    show_menu
    read -p "Select option: " choice
    
    case $choice in
        1) install_deps ;;
        2) start_dev ;;
        3) run_checks ;;
        4) build_prod ;;
        5) preview_build ;;
        6) generate_rsa ;;
        7) generate_ecdsa ;;
        8) deploy_vercel ;;
        9) run_coverage ;;
        0) 
            print_info "Goodbye!"
            exit 0
            ;;
        *)
            print_error "Invalid option"
            ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
done

