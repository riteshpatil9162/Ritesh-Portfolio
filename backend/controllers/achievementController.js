import Achievement from '../models/Achievement.js';

// @desc    Get all achievements
// @route   GET /api/achievements
// @access  Public
export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch achievements',
      error: error.message,
    });
  }
};

// @desc    Get single achievement
// @route   GET /api/achievements/:id
// @access  Public
export const getAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found',
      });
    }

    res.status(200).json({
      success: true,
      data: achievement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch achievement',
      error: error.message,
    });
  }
};

// @desc    Create achievement
// @route   POST /api/achievements
// @access  Private (Admin)
export const createAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Achievement created successfully',
      data: achievement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create achievement',
      error: error.message,
    });
  }
};

// @desc    Update achievement
// @route   PUT /api/achievements/:id
// @access  Private (Admin)
export const updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Achievement updated successfully',
      data: achievement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update achievement',
      error: error.message,
    });
  }
};

// @desc    Delete achievement
// @route   DELETE /api/achievements/:id
// @access  Private (Admin)
export const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Achievement deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete achievement',
      error: error.message,
    });
  }
};
