-- Step 1: Create database 
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'HackerBank')
BEGIN
    CREATE DATABASE [HackerBank];
    PRINT 'Database [HackerBank] created.';
END
ELSE
BEGIN
    PRINT 'Database [HackerBank] already exists. Skipping creation.';
END
GO

USE [HackerBank];
GO

-- Step 2: Create Transactions table
IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'Transactions'
)
BEGIN
    CREATE TABLE [dbo].[Transactions] (
        [Id]          INT             NOT NULL IDENTITY(1,1) PRIMARY KEY,
        [Date]        NVARCHAR(10)    NOT NULL,    -- YYYY-MM-DD
        [Description] NVARCHAR(500)   NOT NULL,
        [Type]        INT             NOT NULL,    -- 0 = Credit, 1 = Debit
        [Amount]      DECIMAL(18, 2)  NOT NULL,
        [Balance]     NVARCHAR(50)    NOT NULL     -- Formatted string e.g. "$12,234.45"
    );

    -- Index on Date for fast filtering
    CREATE NONCLUSTERED INDEX [IX_Transactions_Date]
        ON [dbo].[Transactions] ([Date]);

    -- Index on Amount for fast sorting
    CREATE NONCLUSTERED INDEX [IX_Transactions_Amount]
        ON [dbo].[Transactions] ([Amount]);

    PRINT 'Table [Transactions] created.';
END
ELSE
BEGIN
    PRINT 'Table [Transactions] already exists. Skipping creation.';
END
GO

-- Step 3: Insert seed data 
IF NOT EXISTS (SELECT TOP 1 1 FROM [dbo].[Transactions])
BEGIN
    INSERT INTO [dbo].[Transactions] ([Date], [Description], [Type], [Amount], [Balance])
    VALUES
        ('2019-12-01', 'THE HACKERUNIVERSITY DES: CCD+ ID:0000232343',          0, 1000.00,  '$12,234.45'),
        ('2019-11-25', 'HACKERBANK DES:DEBIT O ID: 000098794578789797987',       1, 2450.45,  '$12,234.45'),
        ('2019-11-29', 'HACKERBANK DES: CREDIT O ID:1223232323',                 1,  999.00,  '$10,928'),
        ('2019-12-03', 'HACKERBANK INC. DES:CCD+ ID: 33375894749',               0, 1985.40,  '$12,234.45'),
        ('2019-11-29', 'HACKERBANK1 BP DES: MERCH PMT ID:1358570',               0, 1520.34,  '$12,234.45'),
        ('2019-11-29', 'HACKERBANK DES: DEBIT O ID:00097494729',                 0,  564.00,  '$12,234.45'),
        ('2019-11-30', 'CREDIT CARD PAYMENT ID: 222349083',                      1, 1987.00,  '$12,234.45');

    PRINT 'Inserted 7 seed transactions.';
END
ELSE
BEGIN
    PRINT 'Transactions table already has data. Skipping seed insert.';
END
GO

-- Step 4: Verify the data
SELECT
    [Id],
    [Date],
    LEFT([Description], 50) AS [Description_Preview],
    CASE [Type] WHEN 0 THEN 'Credit' WHEN 1 THEN 'Debit' ELSE 'Unknown' END AS [TypeLabel],
    [Amount],
    [Balance]
FROM [dbo].[Transactions]
ORDER BY [Date] DESC, [Id];
GO

PRINT '=== HackerBank database initialization complete. ===';
GO
