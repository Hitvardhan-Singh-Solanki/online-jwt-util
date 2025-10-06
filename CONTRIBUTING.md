# Contributing to JWT Decoder & Encoder

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Development Setup

1. **Fork and Clone**

   ```bash
   git clone https://github.com/yourusername/online-jwt-util.git
   cd online-jwt-util
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

4. **Run Tests**
   ```bash
   npm test
   ```

## 📝 Development Workflow

### Branch Naming Convention

- Feature: `feature/description-of-feature`
- Bug Fix: `fix/description-of-bug`
- Documentation: `docs/description`
- Refactor: `refactor/description`

### Commit Messages

We follow conventional commits format:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test additions or modifications
- `chore:` Build process or tooling changes

Example:

```
feat: add support for ES512 algorithm
fix: correct token expiry calculation
docs: update README with deployment instructions
```

### Pull Request Process

1. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

3. **Run Quality Checks**

   ```bash
   npm run lint          # Check linting
   npm run type-check    # TypeScript validation
   npm test              # Run tests
   npm run format        # Format code
   ```

4. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template
   - Link any related issues

## 🧪 Testing Guidelines

### Writing Tests

- Place tests in `src/tests/` directory
- Name test files with `.test.ts` or `.test.tsx` extension
- Test both happy paths and edge cases
- Mock external dependencies when necessary

### Test Structure

```typescript
describe('ComponentName', () => {
  it('should do something specific', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = functionToTest(input);

    // Assert
    expect(result).toBe('expected');
  });
});
```

### Running Tests

```bash
npm test              # Run all tests
npm run test:ui       # Run with UI
npm run test:coverage # Generate coverage report
```

## 🎨 Code Style

### TypeScript

- Use strict TypeScript mode
- Define types for all function parameters and return values
- Prefer interfaces over type aliases for object shapes
- Use meaningful variable and function names

### React

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper TypeScript types for props

### CSS/Tailwind

- Use Tailwind utility classes
- Follow the existing naming pattern
- Keep custom CSS minimal
- Ensure dark mode compatibility

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for utility functions
- Document complex logic with inline comments
- Keep comments up-to-date with code changes

### README Updates

- Update README.md for new features
- Add usage examples where appropriate
- Keep the feature list current

## 🐛 Bug Reports

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/environment information
- Screenshots if applicable

Use the bug report template when creating issues.

## ✨ Feature Requests

For feature requests, please provide:

- Clear description of the feature
- Use cases and benefits
- Possible implementation approach
- Any related examples or references

## 🔒 Security

- Never commit sensitive data (keys, tokens, credentials)
- Review the SECURITY.md file for security guidelines
- Report security vulnerabilities privately (see SECURITY.md)

## 📋 Code Review Process

Pull requests will be reviewed for:

- Code quality and style
- Test coverage
- Documentation
- Performance implications
- Security considerations

Reviewers may request changes. Please address feedback promptly.

## 🎯 Areas for Contribution

### High Priority

- Additional algorithm support
- Performance optimizations
- Accessibility improvements
- Browser compatibility fixes

### Medium Priority

- UI/UX enhancements
- Additional test coverage
- Documentation improvements
- Error handling improvements

### Nice to Have

- Internationalization (i18n)
- Additional export formats
- Token comparison feature
- Batch token processing

## 💡 Tips for Contributors

1. **Start Small**: Begin with small bug fixes or documentation improvements
2. **Ask Questions**: Don't hesitate to ask for clarification in issues
3. **Be Patient**: Reviews may take time; we appreciate your understanding
4. **Stay Updated**: Pull the latest changes regularly to avoid conflicts
5. **Test Thoroughly**: Test your changes across different browsers

## 🏆 Recognition

Contributors will be acknowledged in:

- README.md contributors section
- Release notes for their contributions

## 📞 Getting Help

- Create an issue for bugs or feature requests
- Use GitHub Discussions for questions
- Check existing issues and PRs before creating new ones

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to make this JWT tool better! 🙏
