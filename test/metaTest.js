describe('environment', () => {
    it('should know what\'s false', () => {
        expect(true).not.toBe(Boolean(0));
    });

    it('should know what\'s true', () => {
        expect(true).toBe(Boolean(1));
    });
});
